# Database Documentation

## Schema Overview

MySQL database designed for a full-stack banking system supporting user management, account operations, financial transactions, and advanced security features.

## Tables

### Users
Stores user accounts and authentication data with soft delete capability.
- **Primary Key**: `id` (UUID)
- **Relationships**: One-to-Many with Accounts, Sessions, Notifications, Audit Logs
- **Key Fields**: email (unique), role, status, deleted_at
- **Roles**: CUSTOMER, ADMIN

### User Profiles
Extended user information and security settings.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` → Users(id)
- **Features**: Contact information, two-factor authentication ready, profile images

### Accounts
Manages bank accounts and balances with financial constraints.
- **Primary Key**: `id` (UUID) 
- **Foreign Key**: `user_id` → Users(id)
- **Constraints**: Balance ≥ 0, Unique account numbers
- **Types**: CHECKING, SAVINGS
- **Status**: ACTIVE, INACTIVE, FROZEN, CLOSED, PENDING_APPROVAL

### Account Limits
Transaction limits and security restrictions per account.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `account_id` → Accounts(id)
- **Limits**: Daily, monthly, and per-transaction amount limits

### Transactions
Records all financial operations with fee tracking and processing metadata.
- **Primary Key**: `id` (UUID)
- **Foreign Keys**: `account_id`, `from_account_id`, `to_account_id` → Accounts(id)
- **Types**: DEPOSIT, WITHDRAWAL, TRANSFER, FEE
- **Status**: PENDING, COMPLETED, FAILED, CANCELLED
- **Enhanced**: Fee tracking, processor information, timestamps

### Sessions
JWT token management for secure authentication.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` → Users(id)
- **Security**: Token hashing, expiration tracking, secure session management

### Notifications
In-app notification system for user alerts and communications.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` → Users(id)
- **Types**: TRANSACTION, SECURITY, SYSTEM, PROMOTIONAL
- **Features**: Read status, timestamps, message tracking

### Audit Logs
Comprehensive security and compliance tracking.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` → Users(id)
- **Tracking**: User actions, IP addresses, user agents, metadata
- **Enhanced**: JSON metadata for flexible logging

## Entity Relationships

```
Users (1) → (N) Accounts (1) → (N) Transactions
    ↓
  (1) → (N) User Profiles
  (1) → (N) Sessions
  (1) → (N) Notifications
  (1) → (N) Audit Logs

Accounts (1) → (1) Account Limits
```

## Enhanced Features

### Security & Compliance
- **JWT Session Management**: Secure token handling with expiration
- **Soft Delete**: User deactivation without data loss
- **Account Limits**: Daily/monthly transaction limits for fraud prevention
- **Two-Factor Ready**: Infrastructure for 2FA implementation
- **Complete Audit Trail**: Comprehensive action logging

### User Experience
- **User Profiles**: Extended personal information and preferences
- **Notification System**: Real-time user alerts and communications
- **Fee Tracking**: Complete transaction fee history
- **Processing Metadata**: Transaction lifecycle tracking

### Performance & Scalability
- **Optimized Indexing**: Enhanced query performance across all tables
- **JSON Metadata**: Flexible data storage in audit logs
- **Soft Delete Patterns**: Efficient data retention and recovery
- **Relationship Integrity**: Proper foreign key constraints with cascading deletes

## Setup

```sql
-- Deploy complete enhanced schema
CREATE DATABASE IF NOT EXISTS bank_system;
USE bank_system;
-- Execute schema.sql file contents

-- Load enhanced sample data
-- Execute seed.sql file contents
```

## Sample Data Includes

- **Admin User**: System administrator with full access
- **Customer Accounts**: Multiple users with checking/savings accounts
- **Transaction History**: Deposits, withdrawals, transfers with fees
- **Security Data**: Sessions, audit logs, account limits
- **User Experience**: Notifications, user profiles, preferences

## Security Features

- **Authentication Ready**: JWT sessions with secure token management
- **Role-Based Access**: CUSTOMER/ADMIN role enforcement
- **Financial Controls**: Account limits and balance constraints
- **Data Protection**: Soft delete, audit trails, IP tracking
- **Input Validation**: Database-level constraints and checks
- **Compliance Ready**: Complete audit logging for regulatory requirements

## API Integration Ready

The schema supports all required banking operations:
- User registration and authentication
- Account management and balance tracking
- Transaction processing (deposits, withdrawals, transfers)
- Admin dashboard and reporting
- Real-time notifications
- Security monitoring and audit trails

---

*Database schema version 1.1 - Enhanced with enterprise security features, user experience improvements, and production-ready architecture*
