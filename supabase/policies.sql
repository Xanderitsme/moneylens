/*
 * Profiles
 */
alter table public.profiles enable row level security;

-- Allow users to view their own profile
create POLICY "Users can view their own profile" on public.profiles for
select
  using (
    id = (
      select
        auth.uid ()
    )
  );

-- Allow users to update their own profile
create POLICY "Users can update their own profile" on public.profiles for
update using (
  id = (
    select
      auth.uid ()
  )
)
with
  check (
    id = (
      select
        auth.uid ()
    )
  );

/*
 * Wallets
 */
alter table public.wallets enable row level security;

create POLICY "Users can create their own wallets" on public.wallets for
insert
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can view their own wallets" on public.wallets for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can update their own wallets" on public.wallets for
update using (
  user_id = (
    select
      auth.uid ()
  )
)
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can delete their own wallets" on public.wallets for delete using (
  user_id = (
    select
      auth.uid ()
  )
);

/*
 * Categories
 */
alter table public.categories enable row level security;

create POLICY "Users can create their own categories" on public.categories for
insert
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can view their own active categories" on public.categories for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
    and is_active = true
  );

create POLICY "Users can update their own categories" on public.categories for
update using (
  user_id = (
    select
      auth.uid ()
  )
)
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can delete their own categories" on public.categories for delete using (
  user_id = (
    select
      auth.uid ()
  )
);

/*
 * Transactions
 */
alter table public.transactions enable row level security;

create POLICY "Users can create transactions in their own wallets" on public.transactions for
insert
with
  check (
    user_id = (
      select
        auth.uid ()
    )
    and exists (
      select
        1
      from
        wallets
      where
        id = wallet_id
        and user_id = (
          select
            auth.uid ()
        )
    )
    and exists (
      select
        1
      from
        categories
      where
        id = category_id
        and user_id = (
          select
            auth.uid ()
        )
    )
  );

create POLICY "Users can view their own transactions" on public.transactions for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can update their own transactions" on public.transactions for
update using (
  user_id = (
    select
      auth.uid ()
  )
)
with
  check (
    user_id = (
      select
        auth.uid ()
    )
    and exists (
      select
        1
      from
        wallets
      where
        id = wallet_id
        and user_id = (
          select
            auth.uid ()
        )
    )
    and exists (
      select
        1
      from
        categories
      where
        id = category_id
        and user_id = (
          select
            auth.uid ()
        )
    )
  );

create POLICY "Users can delete their own transactions" on public.transactions for delete using (
  user_id = (
    select
      auth.uid ()
  )
);
