-- MySQL Database Setup Script for Banking System
-- Run this script to set up the database properly

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS bank_system;
USE bank_system;

-- Create a dedicated user for the banking system (optional but recommended)
-- Uncomment and modify these lines if you want to create a specific user:
-- CREATE USER IF NOT EXISTS 'bank_user'@'localhost' IDENTIFIED BY 'secure_password_123';
-- GRANT ALL PRIVILEGES ON bank_system.* TO 'bank_user'@'localhost';
-- FLUSH PRIVILEGES;

-- Users Table (Enhanced)
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

-- User Profiles Table
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

-- Accounts Table (Enhanced)
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

-- Account Limits Table
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

-- Transactions Table (Enhanced)
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

-- Sessions Table
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

-- Notifications Table
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

-- Audit Logs Table (Enhanced)
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

-- Insert admin and user accounts with encrypted passwords
INSERT INTO users (id, email, password, first_name, last_name, role, status) VALUES
(UUID(), 'Admin@nubank.com', '$2a$10$t30ONmG1cZ6hVcgBaY.GTO1xJwisLGEvZ0o8ucB1rKtre2ZP1h9We', 'Admin', 'User', 'ADMIN', 'ACTIVE'),
(UUID(), 'user1@nu.edu.eg', '$2a$10$rgSiwH/1dRs2DKpI/UFEYOO3E/1wAOodHCvtk0HpY5nhXHsZy/fYi', 'User', 'One', 'CUSTOMER', 'ACTIVE'),
(UUID(), 'user2@nu.edu.eg', '$2a$10$7JD9Jlh.3RkUKWH8u4u11.CP3hcnhezm.wllH7t8.GgcrrkLjucR6', 'User', 'Two', 'CUSTOMER', 'ACTIVE'),
(UUID(), 'user3@nu.edu.eg', '$2a$10$0K97AT8LP0zap9VTqueeZuQ1jCk5C37DvBDx/R6fQ55vKKhGYLZi.', 'User', 'Three', 'CUSTOMER', 'ACTIVE');

SELECT 'Database setup completed successfully!' AS status;
