# Banking System Database Setup with Realistic Egyptian Data

## Overview
This document explains how to set up the banking system database with realistic Egyptian user data, including 15 users with complete profiles, accounts, transactions, and all related data.

## Database Structure
The database contains the following tables with realistic data:
- **users**: 15 Egyptian users (1 admin + 14 customers)
- **user_profiles**: Complete profiles with Egyptian addresses and phone numbers
- **accounts**: 20 accounts (mix of checking and savings) with realistic balances
- **account_limits**: Transaction limits for each account
- **transactions**: 35+ realistic transactions (deposits, withdrawals, transfers)
- **sessions**: Active user sessions
- **notifications**: User notifications
- **audit_logs**: Security and activity logs

## Data Features
- **Realistic Egyptian Names**: Mohamed, Fatma, Ali, Sara, Youssef, Nour, Omar, Aya, Karim, Layla, Hassan, Mariam, Ahmed, Hana
- **Egyptian Addresses**: Locations in Cairo (Zamalek, Heliopolis, Maadi, etc.), Alexandria, Mansoura, Tanta
- **Egyptian Phone Numbers**: +20 country code with realistic area codes
- **Realistic Transactions**: Salary deposits, grocery shopping, ATM withdrawals, transfers, bills, etc.
- **Egyptian Currency**: All amounts in EGP (Egyptian Pounds)
- **Realistic Balances**: Varying account balances from EGP 5,678 to EGP 112,233

## Setup Instructions

### 1. Prerequisites
- MySQL Server installed and running
- Database user with privileges to create databases and tables

### 2. Run Database Setup
```bash
# Method 1: Direct execution (will prompt for password)
mysql -u root -p < setup_database.sql

# Method 2: If you have a password file or want to avoid prompts
mysql -u root -p'your_password' < setup_database.sql
```

### 3. Verify Setup
```bash
# Run verification script
mysql -u root -p < verify_database.sql
```

## Sample Data Summary

### Admin User
- **Name**: Ahmed Mohamed
- **Email**: admin@nubank.com
- **Role**: Admin
- **Balance**: EGP 50,000

### Sample Customer Users
1. **Mohamed Ahmed** - Software Engineer, Zamalek, Cairo
2. **Fatma Khalil** - Teacher, Shoubra, Cairo
3. **Ali Hassan** - Freelancer, Alexandria
4. **Sara Mahmoud** - Manager, Heliopolis, Cairo
5. **Youssef Ibrahim** - Business Owner, Mansoura
6. **Nour El-Sayed** - Student, Tanta
7. **Omar Farouk** - Consultant, Nasr City, Cairo
8. **Aya Mostafa** - Teacher, Dokki, Cairo
9. **Karim Abdullah** - Engineer, Maadi, Cairo
10. **Layla Hussein** - Translator, Mohandessin, Cairo
11. **Hassan Zaki** - Doctor, Obour City
12. **Mariam Fathy** - Graphic Designer, El-Shorouk City
13. **Ahmed Salem** - IT Consultant, El-Sheikh Zayed
14. **Hana Elsayed** - Content Writer, El-Haram, Giza

## Transaction Types Included
- Salary deposits
- ATM withdrawals
- Grocery shopping (Carrefour)
- Restaurant payments
- Gas station payments
- Pharmacy purchases
- Online shopping
- Rent payments
- Family transfers
- Business investments
- Medical supplies
- Bookstore purchases
- Electronics shopping

## Security Features
- All passwords hashed with bcrypt (cost factor 10)
- Two-factor authentication enabled for some users
- Session management
- Audit logging for all activities
- Account limits and restrictions

## Testing the Application
After setup, you can test the application with these credentials:

**Admin Login:**
- Email: admin@nubank.com
- Password: password123

**Customer Login Examples:**
- Email: mohamed.ahmed@nu.edu.eg, Password: password123
- Email: fatma.khalil@nu.edu.eg, Password: password123
- Email: ali.hassan@nu.edu.eg, Password: password123

## Important Notes
- All data is fictional but realistic for testing purposes
- Egyptian addresses and phone numbers follow local formats
- Transaction amounts reflect typical Egyptian spending patterns
- The database is ready for production use with proper indexing and constraints
