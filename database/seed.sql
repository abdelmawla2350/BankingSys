-- Bank System Sample Data
-- For development and testing

USE bank_system;

-- Admin User (password will be hashed in backend)
INSERT INTO users (id, email, password, first_name, last_name, role) VALUES
(UUID(), 'admin@bank.com', 'temp_password_hash', 'System', 'Admin', 'ADMIN');

-- Sample Customers
INSERT INTO users (id, email, password, first_name, last_name, role) VALUES
(UUID(), 'john.doe@email.com', 'temp_password_hash', 'John', 'Doe', 'CUSTOMER'),
(UUID(), 'jane.smith@email.com', 'temp_password_hash', 'Jane', 'Smith', 'CUSTOMER'),
(UUID(), 'bob.wilson@email.com', 'temp_password_hash', 'Bob', 'Wilson', 'CUSTOMER');

-- Sample Accounts
INSERT INTO accounts (id, user_id, account_number, routing_number, type, balance, status) VALUES
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), '100000001', '021000021', 'CHECKING', 1500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'john.doe@email.com'), '100000002', '021000021', 'SAVINGS', 5000.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'jane.smith@email.com'), '100000003', '021000021', 'CHECKING', 2500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'jane.smith@email.com'), '100000004', '021000021', 'SAVINGS', 7500.00, 'ACTIVE'),
(UUID(), (SELECT id FROM users WHERE email = 'bob.wilson@email.com'), '100000005', '021000021', 'CHECKING', 1000.00, 'ACTIVE');

-- Sample Transactions
INSERT INTO transactions (id, amount, type, description, from_account_id, to_account_id, account_id, reference) VALUES
(UUID(), 500.00, 'DEPOSIT', 'Initial deposit', NULL, NULL, 
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'DEP001'),
(UUID(), 100.00, 'WITHDRAWAL', 'ATM withdrawal', NULL, NULL,
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'WD001'),
(UUID(), 200.00, 'TRANSFER', 'Transfer to Jane Smith',
 (SELECT id FROM accounts WHERE account_number = '100000001'),
 (SELECT id FROM accounts WHERE account_number = '100000003'),
 (SELECT id FROM accounts WHERE account_number = '100000001'), 'TF001');