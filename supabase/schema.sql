-- ViralHookLab.com credits + billing schema (Postgres / Supabase)
-- Apply in Supabase SQL editor.

create table if not exists public.profiles (
  user_id text primary key,
  email text,
  tier text not null default 'free',
  monthly_credits integer not null default 0,
  lifetime_credits integer not null default 0,
  daily_free_credits integer not null default 3,
  last_reset_date timestamptz not null default now()
);

create table if not exists public.billing_customers (
  user_id text primary key references public.profiles(user_id) on delete cascade,
  stripe_customer_id text,
  stripe_subscription_id text,
  current_price_id text,
  updated_at timestamptz not null default now()
);

create or replace function public.ensure_profile(p_user_id text, p_email text default null)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare
  prof public.profiles;
begin
  insert into public.profiles (user_id, email)
  values (p_user_id, p_email)
  on conflict (user_id) do update
    set email = coalesce(public.profiles.email, excluded.email);

  select * into prof from public.profiles where user_id = p_user_id;
  return prof;
end;
$$;

create or replace function public.get_credits(p_user_id text)
returns table (
  tier text,
  total_credits integer,
  daily_free_credits integer,
  monthly_credits integer,
  lifetime_credits integer,
  last_reset_date timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  prof public.profiles;
begin
  -- Ensure profile exists.
  select * into prof from public.profiles where user_id = p_user_id;
  if not found then
    insert into public.profiles (user_id) values (p_user_id);
    select * into prof from public.profiles where user_id = p_user_id;
  end if;

  -- Daily reset for free tier.
  if prof.tier = 'free' and (prof.last_reset_date at time zone 'utc')::date <> (now() at time zone 'utc')::date then
    update public.profiles
      set daily_free_credits = 3,
          last_reset_date = now()
      where user_id = p_user_id;
    select * into prof from public.profiles where user_id = p_user_id;
  end if;

  tier := prof.tier;
  daily_free_credits := prof.daily_free_credits;
  monthly_credits := prof.monthly_credits;
  lifetime_credits := prof.lifetime_credits;
  last_reset_date := prof.last_reset_date;
  total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
  return next;
end;
$$;

create or replace function public.deduct_credits(p_user_id text, p_amount integer default 1)
returns table (
  ok boolean,
  tier text,
  total_credits integer,
  daily_free_credits integer,
  monthly_credits integer,
  lifetime_credits integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  prof public.profiles;
  remaining integer;
  amt integer;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'p_amount must be > 0';
  end if;

  -- Lock the row for atomic deduction.
  select * into prof from public.profiles where user_id = p_user_id for update;
  if not found then
    insert into public.profiles (user_id) values (p_user_id);
    select * into prof from public.profiles where user_id = p_user_id for update;
  end if;

  -- Daily reset for free tier.
  if prof.tier = 'free' and (prof.last_reset_date at time zone 'utc')::date <> (now() at time zone 'utc')::date then
    update public.profiles
      set daily_free_credits = 3,
          last_reset_date = now()
      where user_id = p_user_id;
    select * into prof from public.profiles where user_id = p_user_id for update;
  end if;

  remaining := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
  if remaining < p_amount then
    ok := false;
    tier := prof.tier;
    daily_free_credits := prof.daily_free_credits;
    monthly_credits := prof.monthly_credits;
    lifetime_credits := prof.lifetime_credits;
    total_credits := remaining;
    return next;
    return;
  end if;

  amt := p_amount;

  -- Deduct order: daily_free -> monthly -> lifetime.
  if amt > 0 and prof.daily_free_credits > 0 then
    if prof.daily_free_credits >= amt then
      prof.daily_free_credits := prof.daily_free_credits - amt;
      amt := 0;
    else
      amt := amt - prof.daily_free_credits;
      prof.daily_free_credits := 0;
    end if;
  end if;

  if amt > 0 and prof.monthly_credits > 0 then
    if prof.monthly_credits >= amt then
      prof.monthly_credits := prof.monthly_credits - amt;
      amt := 0;
    else
      amt := amt - prof.monthly_credits;
      prof.monthly_credits := 0;
    end if;
  end if;

  if amt > 0 and prof.lifetime_credits > 0 then
    if prof.lifetime_credits >= amt then
      prof.lifetime_credits := prof.lifetime_credits - amt;
      amt := 0;
    else
      amt := amt - prof.lifetime_credits;
      prof.lifetime_credits := 0;
    end if;
  end if;

  update public.profiles
    set daily_free_credits = prof.daily_free_credits,
        monthly_credits = prof.monthly_credits,
        lifetime_credits = prof.lifetime_credits
    where user_id = p_user_id;

  ok := true;
  tier := prof.tier;
  daily_free_credits := prof.daily_free_credits;
  monthly_credits := prof.monthly_credits;
  lifetime_credits := prof.lifetime_credits;
  total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
  return next;
end;
$$;

create table if not exists public.credit_ledger (
  id bigserial primary key,
  user_id text not null references public.profiles(user_id) on delete cascade,
  delta integer not null,
  reason text not null,
  external_id text,
  request_id text,
  created_at timestamptz not null default now()
);

create index if not exists idx_credit_ledger_user_created
  on public.credit_ledger (user_id, created_at desc);

create unique index if not exists uq_credit_ledger_reason_external
  on public.credit_ledger (reason, external_id)
  where external_id is not null;

create unique index if not exists uq_credit_ledger_user_request
  on public.credit_ledger (user_id, request_id)
  where request_id is not null;

create table if not exists public.processed_webhooks (
  event_id text primary key,
  provider text not null,
  event_type text not null,
  processed_at timestamptz not null default now()
);

do $$
begin
  alter table public.profiles
    add constraint profiles_tier_check
    check (tier in ('free', 'starter', 'agency'));
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter table public.profiles
    add constraint profiles_daily_non_negative
    check (daily_free_credits >= 0);
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter table public.profiles
    add constraint profiles_monthly_non_negative
    check (monthly_credits >= 0);
exception
  when duplicate_object then null;
end $$;

do $$
begin
  alter table public.profiles
    add constraint profiles_lifetime_non_negative
    check (lifetime_credits >= 0);
exception
  when duplicate_object then null;
end $$;

create or replace function public.grant_credits(
  p_user_id text,
  p_amount integer,
  p_reason text default 'manual',
  p_external_id text default null,
  p_request_id text default null
)
returns table (
  ok boolean,
  tier text,
  total_credits integer,
  daily_free_credits integer,
  monthly_credits integer,
  lifetime_credits integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  prof public.profiles;
  inserted_id bigint;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'p_amount must be > 0';
  end if;

  select * into prof from public.profiles where user_id = p_user_id for update;
  if not found then
    insert into public.profiles (user_id) values (p_user_id);
    select * into prof from public.profiles where user_id = p_user_id for update;
  end if;

  if p_request_id is not null and exists (
    select 1 from public.credit_ledger
    where user_id = p_user_id and request_id = p_request_id
  ) then
    ok := true;
    tier := prof.tier;
    daily_free_credits := prof.daily_free_credits;
    monthly_credits := prof.monthly_credits;
    lifetime_credits := prof.lifetime_credits;
    total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
    return next;
    return;
  end if;

  if p_external_id is not null and exists (
    select 1 from public.credit_ledger
    where reason = p_reason and external_id = p_external_id
  ) then
    ok := true;
    tier := prof.tier;
    daily_free_credits := prof.daily_free_credits;
    monthly_credits := prof.monthly_credits;
    lifetime_credits := prof.lifetime_credits;
    total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
    return next;
    return;
  end if;

  update public.profiles
    set lifetime_credits = lifetime_credits + p_amount
    where user_id = p_user_id;

  insert into public.credit_ledger (user_id, delta, reason, external_id, request_id)
  values (p_user_id, p_amount, p_reason, p_external_id, p_request_id)
  returning id into inserted_id;

  select * into prof from public.profiles where user_id = p_user_id;

  ok := inserted_id is not null;
  tier := prof.tier;
  daily_free_credits := prof.daily_free_credits;
  monthly_credits := prof.monthly_credits;
  lifetime_credits := prof.lifetime_credits;
  total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
  return next;
end;
$$;

create or replace function public.deduct_credits_idempotent(
  p_user_id text,
  p_amount integer default 1,
  p_request_id text default null,
  p_reason text default 'generate'
)
returns table (
  ok boolean,
  charged boolean,
  tier text,
  total_credits integer,
  daily_free_credits integer,
  monthly_credits integer,
  lifetime_credits integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  prof public.profiles;
  existing_charge boolean;
  d record;
begin
  if p_amount is null or p_amount <= 0 then
    raise exception 'p_amount must be > 0';
  end if;

  if p_request_id is not null then
    select exists (
      select 1 from public.credit_ledger
      where user_id = p_user_id
        and request_id = p_request_id
        and delta < 0
    ) into existing_charge;

    if existing_charge then
      select * into prof from public.profiles where user_id = p_user_id;
      if not found then
        insert into public.profiles (user_id) values (p_user_id);
        select * into prof from public.profiles where user_id = p_user_id;
      end if;
      ok := true;
      charged := false;
      tier := prof.tier;
      daily_free_credits := prof.daily_free_credits;
      monthly_credits := prof.monthly_credits;
      lifetime_credits := prof.lifetime_credits;
      total_credits := prof.daily_free_credits + prof.monthly_credits + prof.lifetime_credits;
      return next;
      return;
    end if;
  end if;

  select * into d from public.deduct_credits(p_user_id, p_amount);
  ok := coalesce(d.ok, false);
  charged := false;
  tier := coalesce(d.tier, 'free');
  daily_free_credits := coalesce(d.daily_free_credits, 0);
  monthly_credits := coalesce(d.monthly_credits, 0);
  lifetime_credits := coalesce(d.lifetime_credits, 0);
  total_credits := coalesce(d.total_credits, 0);

  if not ok then
    return next;
    return;
  end if;

  insert into public.credit_ledger (user_id, delta, reason, request_id)
  values (p_user_id, -p_amount, p_reason, p_request_id)
  on conflict do nothing;

  charged := true;
  return next;
end;
$$;

