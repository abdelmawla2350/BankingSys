-- Enhanced Sample Data with new tables

USE bank_system;

-- Insert Admin User
INSERT INTO users (id, email, password, first_name, last_name, role) VALUES
(UUID(), 'admin@bank.com', 'temp_password_hash', 'System', 'Admin', 'ADMIN');

-- Insert Sample Customers
INSERT INTO users (id, email, password, first_name, last_name, role) VALUES
(UUID(), 'john.doe@email.com', 'temp_password_hash', 'John', 'Doe', 'CUSTOMER'),
(UUID(), 'jane.smith@email.com', 'temp_password_hash', 'Jane', 'Smith', 'CUSTOMER'),
(UUID(), 'bob.wilson@email.com', 'temp_password_hash', 'Bob', 'Wilson', 'CUSTOMER');

-- Create Accounts for Customers
INSERT INTO accounts (id, user_id, account_number, routing_number, type, balance, status) VALUES
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), '100000001', '021000021', 'CHECKING', 1500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), '100000002', '021000021', 'SAVINGS', 5000.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'jane.smith@email.com'), '100000003', '021000021', 'CHECKING', 2500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'jane.smith@email.com'), '100000004', '021000021', 'SAVINGS', 7500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'bob.wilson@email.com'), '100000005', '021000021', 'CHECKING', 1000.00, 'ACTIVE');

-- Add Account Limits
INSERT INTO account_limits (id, account_id, daily_limit, monthly_limit, transaction_limit) VALUES
(UUID(), (SELECT id FROM accounts WHERE account_number = '100000001'), 10000.00, 50000.00, 5000.00),
(UUID(), (SELECT id FROM accounts WHERE account_number = '100000002'), 5000.00, 25000.00, 2500.00),
(UUID(), (SELECT id FROM accounts WHERE account_number = '100000003'), 10000.00, 50000.00, 5000.00);

-- Sample Transactions (Enhanced with fees)
INSERT INTO transactions (id, amount, fee_amount, type, description, from_account_id, to_account_id, account_id, reference) VALUES
(UUID(), 500.00, 0.00, 'DEPOSIT', 'Initial deposit', NULL, NULL, 
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'DEP001'),
(UUID(), 100.00, 2.50, 'WITHDRAWAL', 'ATM withdrawal', NULL, NULL,
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'WD001'),
(UUID(), 200.00, 1.00, 'TRANSFER', 'Transfer to Jane Smith',
 (SELECT id FROM accounts WHERE account_number = '100000001'),
 (SELECT id FROM accounts WHERE account_number = '100000003'),
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'TF001');

-- Sample Notifications
INSERT INTO notifications (id, user_id, type, title, message, is_read) VALUES
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), 'TRANSACTION', 'Transfer Completed', 'Your transfer of $200.00 has been completed.', FALSE),
(UUID(), (SELECT id FROM users WHERE email = 'jane.smith@email.com'), 'SECURITY', 'New Login', 'New login detected from your account.', TRUE);

-- Sample Audit Logs
INSERT INTO audit_logs (id, user_id, action, description, ip_address, user_agent) VALUES
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), 'LOGIN', 'User logged in successfully', '192.168.1.100', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');