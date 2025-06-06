-- Trigger to update updated_at timestamp
create
or
replace
  function public.update_updated_at_column () returns trigger language plpgsql security definer
set
  search_path = "" as $$ begin new.updated_at = current_timestamp;

return new;

end;

$$;

-- Trigger to update wallet balance when transactions are added/updated/deleted
create
or
replace
  function public.update_wallet_balance () returns trigger language plpgsql security definer
set
  search_path = "" as $$ begin if TG_OP = 'INSERT' then
update wallets
set
  total_income = case
    when new.type = 'income' then total_income + new.amount
    else total_income
  end,
  total_expense = case
    when new.type = 'expense' then total_expense + new.amount
    else total_expense
  end
where
  id = new.wallet_id;

ELSIF TG_OP = 'UPDATE' then
update wallets
set
  total_income = case
    when old.type = 'income' then total_income - old.amount
    else total_income
  end + case
    when new.type = 'income' then new.amount
    else 0
  end,
  total_expense = case
    when old.type = 'expense' then total_expense - old.amount
    else total_expense
  end + case
    when new.type = 'expense' then new.amount
    else 0
  end
where
  id = new.wallet_id;

ELSIF TG_OP = 'DELETE' then
update wallets
set
  total_income = case
    when old.type = 'income' then total_income - old.amount
    else total_income
  end,
  total_expense = case
    when old.type = 'expense' then total_expense - old.amount
    else total_expense
  end
where
  id = old.wallet_id;

end if;

return null;

end;

$$;

-- Function to handle soft delete for categories
create
or
replace
  function public.soft_delete_category () returns trigger language plpgsql security definer
set
  search_path = "" as $$ begin
update categories
set
  is_active = false,
  deleted_at = current_timestamp,
  name = name || ' (deleted ' || to_char (current_timestamp, 'YYYY-MM-DD HH24:MI:SS') || ')'
where
  id = old.id;

return null;

end;

$$;

-- inserts a row into public.profiles
create function public.handle_new_user () returns trigger language plpgsql security definer
set
  search_path = '' as $$ begin
insert into
  public.profiles (id, name)
values
  (new.id, new.raw_user_meta_data ->> 'name');

return new;

end;

$$;
