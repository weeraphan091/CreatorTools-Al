export type ProfilesRow = {
  user_id: string;
  email: string | null;
  tier: string;
  monthly_credits: number;
  lifetime_credits: number;
  daily_free_credits: number;
  last_reset_date: string;
};

export type BillingCustomersRow = {
  user_id: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  current_price_id: string | null;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfilesRow;
        Insert: Partial<ProfilesRow>;
        Update: Partial<ProfilesRow>;
        Relationships: [];
      };
      billing_customers: {
        Row: BillingCustomersRow;
        Insert: Partial<BillingCustomersRow>;
        Update: Partial<BillingCustomersRow>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

