-- Note: We don't create a users table as we'll use Supabase's auth.users table

-- Wallets table with proper constraints and data types
CREATE TABLE wallets (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    initial_balance DECIMAL(15,2) DEFAULT 0.00,
    current_balance DECIMAL(15,2) DEFAULT 0.00,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for wallets
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Policies for wallets
CREATE POLICY "Users can view their own wallets"
    ON wallets FOR SELECT
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can create their own wallets"
    ON wallets FOR INSERT
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own wallets"
    ON wallets FOR UPDATE
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete their own wallets"
    ON wallets FOR DELETE
    USING (user_id = (SELECT auth.uid()));

-- Categories table with proper constraints and data types
CREATE TABLE categories (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    type VARCHAR(20) CHECK (type IN ('expense', 'income', 'both')) DEFAULT 'both',
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT TRUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP WITH TIME ZONE
);

-- Create a unique partial index for active categories
CREATE UNIQUE INDEX categories_active_name_user_id_idx 
    ON categories (name, user_id)
    WHERE is_active = TRUE;

-- Enable RLS for categories
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Users can view their own active categories"
    ON categories FOR SELECT
    USING (user_id = (SELECT auth.uid()) AND is_active = TRUE);

CREATE POLICY "Users can create their own categories"
    ON categories FOR INSERT
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can update their own categories"
    ON categories FOR UPDATE
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can delete their own categories"
    ON categories FOR DELETE
    USING (user_id = (SELECT auth.uid()));

-- Transactions table (formerly expenses_incomes)
CREATE TABLE transactions (
    id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    amount DECIMAL(15,2) NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('expense', 'income')),
    description TEXT,
    transaction_date DATE NOT NULL DEFAULT CURRENT_DATE,
    wallet_id BIGINT NOT NULL REFERENCES wallets(id) ON DELETE CASCADE,
    category_id BIGINT NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS for transactions
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for transactions
CREATE POLICY "Users can view their own transactions"
    ON transactions FOR SELECT
    USING (user_id = (SELECT auth.uid()));

CREATE POLICY "Users can create transactions in their own wallets"
    ON transactions FOR INSERT
    WITH CHECK (
        user_id = (SELECT auth.uid()) AND
        EXISTS (
            SELECT 1 FROM wallets 
            WHERE id = wallet_id AND user_id = (SELECT auth.uid())
        ) AND
        EXISTS (
            SELECT 1 FROM categories 
            WHERE id = category_id AND user_id = (SELECT auth.uid())
        )
    );

CREATE POLICY "Users can update their own transactions"
    ON transactions FOR UPDATE
    USING (user_id = (SELECT auth.uid()))
    WITH CHECK (
        user_id = (SELECT auth.uid()) AND
        EXISTS (
            SELECT 1 FROM wallets 
            WHERE id = wallet_id AND user_id = (SELECT auth.uid())
        ) AND
        EXISTS (
            SELECT 1 FROM categories 
            WHERE id = category_id AND user_id = (SELECT auth.uid())
        )
    );

CREATE POLICY "Users can delete their own transactions"
    ON transactions FOR DELETE
    USING (user_id = (SELECT auth.uid()));

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers to all tables
CREATE TRIGGER update_wallets_updated_at
    BEFORE UPDATE ON wallets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_transactions_updated_at
    BEFORE UPDATE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger to update wallet balance when transactions are added/updated/deleted
CREATE OR REPLACE FUNCTION update_wallet_balance()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE wallets 
        SET current_balance = current_balance + 
            CASE 
                WHEN NEW.type = 'income' THEN NEW.amount 
                ELSE -NEW.amount 
            END
        WHERE id = NEW.wallet_id;
    ELSIF TG_OP = 'UPDATE' THEN
        UPDATE wallets 
        SET current_balance = current_balance - 
            CASE 
                WHEN OLD.type = 'income' THEN OLD.amount 
                ELSE -OLD.amount 
            END
            +
            CASE 
                WHEN NEW.type = 'income' THEN NEW.amount 
                ELSE -NEW.amount 
            END
        WHERE id = NEW.wallet_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE wallets 
        SET current_balance = current_balance - 
            CASE 
                WHEN OLD.type = 'income' THEN OLD.amount 
                ELSE -OLD.amount 
            END
        WHERE id = OLD.wallet_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_wallet_balance_trigger
    AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH ROW
    EXECUTE FUNCTION update_wallet_balance();

-- Function to handle soft delete for categories
CREATE OR REPLACE FUNCTION soft_delete_category()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Instead of actual deletion, update the category to be inactive
    UPDATE categories
    SET 
        is_active = FALSE,
        deleted_at = CURRENT_TIMESTAMP,
        name = name || ' (deleted ' || to_char(CURRENT_TIMESTAMP, 'YYYY-MM-DD HH24:MI:SS') || ')'
    WHERE id = OLD.id;
    
    RETURN NULL; -- Prevents the actual deletion
END;
$$ LANGUAGE plpgsql;

-- Trigger to intercept deletion and perform soft delete instead
CREATE TRIGGER soft_delete_category_trigger
    BEFORE DELETE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION soft_delete_category();
