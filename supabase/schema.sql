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

