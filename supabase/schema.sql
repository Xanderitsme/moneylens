create table
  public.profiles (
    id uuid not null references auth.users on delete cascade,
    name text not null,
    primary key (id)
  );

create table
  public.wallets (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    name varchar(255) not null,
    description text,
    initial_balance decimal(15, 2) not null default 0.00,
    total_income decimal(15, 2) not null default 0.00,
    total_expense decimal(15, 2) not null default 0.00,
    created_at timestamp
    with
      time zone default current_timestamp not null,
      updated_at timestamp
    with
      time zone default current_timestamp not null
  );

create type categories_type as enum('expense', 'income', 'both');

create table
  public.categories (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    name varchar(255) not null,
    type categories_type default 'both' not null,
    is_active boolean default true not null,
    created_at timestamp
    with
      time zone default current_timestamp not null,
      updated_at timestamp
    with
      time zone default current_timestamp not null,
      deleted_at timestamp
    with
      time zone
  );

create unique index categories_active_name_user_id_idx on categories (name, user_id)
where
  is_active = true;

create type transactions_type as enum('expense', 'income');

create table
  public.transactions (
    id uuid primary key default gen_random_uuid (),
    user_id uuid not null references auth.users (id) on delete cascade,
    wallet_id uuid not null references wallets (id) on delete cascade,
    category_id uuid not null references categories (id) on delete restrict,
    amount decimal(15, 2) not null,
    type transactions_type not null,
    description text,
    transaction_date date not null default current_date,
    created_at timestamp
    with
      time zone default current_timestamp not null,
      updated_at timestamp
    with
      time zone default current_timestamp not null
  );
