# Database Documentation

## Schema Overview

MySQL database designed for a full-stack banking system supporting user management, account operations, and financial transactions.

## Tables

### Users
Stores user accounts and authentication data.
- **Primary Key**: `id` (UUID)
- **Relationships**: One-to-Many with Accounts, Audit Logs
- **Key Fields**: email (unique), role, status
- **Roles**: CUSTOMER, ADMIN

### Accounts
Manages bank accounts and balances.
- **Primary Key**: `id` (UUID) 
- **Foreign Key**: `user_id` → Users(id)
- **Constraints**: Balance ≥ 0, Unique account numbers
- **Types**: CHECKING, SAVINGS
- **Status**: ACTIVE, INACTIVE, FROZEN, CLOSED, PENDING_APPROVAL

### Transactions
Records all financial operations.
- **Primary Key**: `id` (UUID)
- **Foreign Keys**: `account_id`, `from_account_id`, `to_account_id` → Accounts(id)
- **Types**: DEPOSIT, WITHDRAWAL, TRANSFER, FEE
- **Status**: PENDING, COMPLETED, FAILED, CANCELLED

### Audit Logs
Security and compliance tracking.
- **Primary Key**: `id` (UUID)
- **Foreign Key**: `user_id` → Users(id)
- **Tracking**: User actions, IP addresses, timestamps

## Entity Relationships
Users (1) → (N) Accounts (1) → (N) Transactions
↓
(1) → (N) Audit Logs


- **One-to-Many**: Users to Accounts
- **One-to-Many**: Accounts to Transactions  
- **One-to-Many**: Users to Audit Logs

## Setup

```sql
-- Deploy complete schema
SOURCE database/schema.sql;
-- Load sample data (development)
SOURCE database/seed.sql;
```

## Security Features

- Password hashing ready (bcrypt)
- Role-based access control
- Complete audit trail
- Referential integrity with cascading deletes
- Balance validation constraints


## Sample Data

Includes test users, accounts, and transactions for development:
- Admin user with system access
- Customer accounts with balances
- Sample transaction history

Customer accounts with balances

Sample transaction history

*Database schema version 1.0 - Designed for banking system compliance and scalability*

