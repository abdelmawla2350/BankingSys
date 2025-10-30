CREATE DATABASE bank_system;
USE bank_system;


-- Bank System Database Schema (Enhanced Version)
-- Version: 1.1
-- Includes: Sessions, User Profiles, Account Limits, Notifications, and security enhancements

CREATE DATABASE IF NOT EXISTS bank_system;
USE bank_system;

-- Users Table (Enhanced with soft delete)
CREATE TABLE users (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role ENUM('CUSTOMER', 'ADMIN') DEFAULT 'CUSTOMER',
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED') DEFAULT 'ACTIVE',
    deleted_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_deleted_at (deleted_at)
);

-- User Profiles Table (Additional user information)
CREATE TABLE user_profiles (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    date_of_birth DATE,
    ssn_last_four CHAR(4),
    profile_image VARCHAR(500),
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    two_factor_secret VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id)
);

-- Accounts Table (Enhanced with better constraints)
CREATE TABLE accounts (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    account_number VARCHAR(20) UNIQUE NOT NULL,
    routing_number VARCHAR(20) NOT NULL,
    type ENUM('CHECKING', 'SAVINGS') NOT NULL,
    balance DECIMAL(15,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('ACTIVE', 'INACTIVE', 'FROZEN', 'CLOSED', 'PENDING_APPROVAL') DEFAULT 'PENDING_APPROVAL',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_account_number (account_number),
    INDEX idx_status (status),
    INDEX idx_type (type),
    CONSTRAINT chk_balance_positive CHECK (balance >= 0)
);

-- Account Limits Table (Transaction limits per account)
CREATE TABLE account_limits (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    account_id CHAR(36) NOT NULL,
    daily_limit DECIMAL(15,2) DEFAULT 10000.00,
    monthly_limit DECIMAL(15,2) DEFAULT 50000.00,
    transaction_limit DECIMAL(15,2) DEFAULT 5000.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    INDEX idx_account_id (account_id)
);

-- Transactions Table (Enhanced with fees and processing info)
CREATE TABLE transactions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    amount DECIMAL(15,2) NOT NULL,
    fee_amount DECIMAL(10,2) DEFAULT 0.00,
    type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'FEE') NOT NULL,
    description VARCHAR(500) NOT NULL,
    from_account_id CHAR(36),
    to_account_id CHAR(36),
    status ENUM('PENDING', 'COMPLETED', 'FAILED', 'CANCELLED') DEFAULT 'COMPLETED',
    reference VARCHAR(100) UNIQUE,
    account_id CHAR(36) NOT NULL,
    processed_at TIMESTAMP NULL,
    processed_by CHAR(36) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_account_id) REFERENCES accounts(id),
    FOREIGN KEY (to_account_id) REFERENCES accounts(id),
    FOREIGN KEY (account_id) REFERENCES accounts(id) ON DELETE CASCADE,
    FOREIGN KEY (processed_by) REFERENCES users(id),
    INDEX idx_account_id (account_id),
    INDEX idx_created_at (created_at),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_reference (reference),
    INDEX idx_transactions_date_range (account_id, created_at),
    CONSTRAINT chk_amount_positive CHECK (amount > 0),
    CONSTRAINT chk_fee_positive CHECK (fee_amount >= 0)
);

-- Sessions Table (JWT token management)
CREATE TABLE sessions (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    token_hash VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_token_hash (token_hash),
    INDEX idx_expires_at (expires_at)
);

-- Notifications Table (User notifications system)
CREATE TABLE notifications (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36) NOT NULL,
    type ENUM('TRANSACTION', 'SECURITY', 'SYSTEM', 'PROMOTIONAL') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_type (type),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);

-- Audit Logs Table (Enhanced with metadata)
CREATE TABLE audit_logs (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    user_id CHAR(36),
    action VARCHAR(100) NOT NULL,
    description TEXT,
    ip_address VARCHAR(45),
    user_agent TEXT,
    metadata JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_audit_logs_date_range (created_at, action)
);




USE bank_system;
SHOW TABLES;

-- Check each table has correct columns
DESCRIBE users;
DESCRIBE user_profiles;
DESCRIBE accounts;
DESCRIBE account_limits;
DESCRIBE transactions;
DESCRIBE sessions;
DESCRIBE notifications;
DESCRIBE audit_logs;

-- Check counts
SELECT 'Users' as table_name, COUNT(*) as count FROM users
UNION ALL SELECT 'Accounts', COUNT(*) FROM accounts
UNION ALL SELECT 'Transactions', COUNT(*) FROM transactions
UNION ALL SELECT 'Sessions', COUNT(*) FROM sessions
UNION ALL SELECT 'User Profiles', COUNT(*) FROM user_profiles
UNION ALL SELECT 'Account Limits', COUNT(*) FROM account_limits
UNION ALL SELECT 'Notifications', COUNT(*) FROM notifications
UNION ALL SELECT 'Audit Logs', COUNT(*) FROM audit_logs;



-- Test user-account relationship
SELECT u.email, a.account_number, a.type, a.balance 
FROM users u 
JOIN accounts a ON u.id = a.user_id 
LIMIT 5;

-- Test transactions
SELECT t.type, t.amount, t.description, a.account_number
FROM transactions t
JOIN accounts a ON t.account_id = a.id
LIMIT 5;

-- Verify new columns exist
SELECT * FROM transactions WHERE fee_amount > 0 LIMIT 1;
SELECT * FROM users WHERE deleted_at IS NULL LIMIT 1;
SELECT * FROM account_limits LIMIT 1;
SELECT * FROM notifications LIMIT 1;