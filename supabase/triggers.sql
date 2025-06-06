create trigger update_wallets_updated_at before
update on wallets for each row
execute function update_updated_at_column ();

create trigger update_categories_updated_at before
update on categories for each row
execute function update_updated_at_column ();

create trigger update_transactions_updated_at before
update on transactions for each row
execute function update_updated_at_column ();

create trigger update_wallet_balance_trigger after
insert
  or
update
or delete on transactions for each row
execute function update_wallet_balance ();

create trigger soft_delete_category_trigger before delete on categories for each row
execute function soft_delete_category ();
