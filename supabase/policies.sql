/*
 * Wallets
 */
alter table wallets enable row level security;

create POLICY "Users can create their own wallets" on wallets for
insert
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can view their own wallets" on wallets for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can update their own wallets" on wallets for
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

create POLICY "Users can delete their own wallets" on wallets for delete using (
  user_id = (
    select
      auth.uid ()
  )
);

/*
 * Categories
 */
alter table categories enable row level security;

create POLICY "Users can create their own categories" on categories for
insert
with
  check (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can view their own active categories" on categories for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
    and is_active = true
  );

create POLICY "Users can update their own categories" on categories for
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

create POLICY "Users can delete their own categories" on categories for delete using (
  user_id = (
    select
      auth.uid ()
  )
);

/*
 * Transactions
 */
alter table transactions enable row level security;

create POLICY "Users can create transactions in their own wallets" on transactions for
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

create POLICY "Users can view their own transactions" on transactions for
select
  using (
    user_id = (
      select
        auth.uid ()
    )
  );

create POLICY "Users can update their own transactions" on transactions for
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

create POLICY "Users can delete their own transactions" on transactions for delete using (
  user_id = (
    select
      auth.uid ()
  )
);
