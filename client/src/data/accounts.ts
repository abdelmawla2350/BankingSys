export interface Account {
  id: string;
  userId: string;
  balance: number;
  accountNumber: string;
  accountType: 'checking' | 'savings';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'transfer_in' | 'transfer_out';
  amount: number;
  description: string;
  recipientAccount?: string;
  senderAccount?: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
  category?: string;
}

export const accounts: Account[] = [
  {
    id: 'acc_1',
    userId: 'user_123',
    balance: 12543.67,
    accountNumber: '****1234',
    accountType: 'checking',
    status: 'active',
    createdAt: '2023-01-15T10:00:00Z',
    updatedAt: '2024-01-15T14:30:00Z'
  },
  {
    id: 'acc_2',
    userId: 'user_456',
    balance: 8750.25,
    accountNumber: '****5678',
    accountType: 'checking',
    status: 'active',
    createdAt: '2023-03-20T09:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z'
  },
  {
    id: 'acc_3',
    userId: 'user_789',
    balance: 23450.00,
    accountNumber: '****9012',
    accountType: 'savings',
    status: 'active',
    createdAt: '2023-02-10T11:30:00Z',
    updatedAt: '2024-01-13T12:20:00Z'
  }
];

export const transactions: Transaction[] = [
  {
    id: 'txn_1',
    accountId: 'acc_1',
    type: 'deposit',
    amount: 3500.00,
    description: 'Salary Deposit',
    timestamp: '2024-01-15T08:00:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: 'txn_2',
    accountId: 'acc_1',
    type: 'transfer_out',
    amount: 125.50,
    description: 'Grocery Shopping',
    recipientAccount: '****9876',
    timestamp: '2024-01-14T15:30:00Z',
    status: 'completed',
    category: 'shopping'
  },
  {
    id: 'txn_3',
    accountId: 'acc_1',
    type: 'withdrawal',
    amount: 200.00,
    description: 'ATM Withdrawal',
    timestamp: '2024-01-13T10:15:00Z',
    status: 'completed',
    category: 'withdrawal'
  },
  {
    id: 'txn_4',
    accountId: 'acc_1',
    type: 'transfer_out',
    amount: 500.00,
    description: 'Online Transfer to John',
    recipientAccount: '****5432',
    timestamp: '2024-01-12T14:20:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: 'txn_5',
    accountId: 'acc_2',
    type: 'deposit',
    amount: 2500.00,
    description: 'Freelance Payment',
    timestamp: '2024-01-11T16:45:00Z',
    status: 'completed',
    category: 'freelance'
  },
  {
    id: 'txn_6',
    accountId: 'acc_2',
    type: 'transfer_out',
    amount: 85.30,
    description: 'Electric Bill',
    recipientAccount: '****1111',
    timestamp: '2024-01-10T09:30:00Z',
    status: 'completed',
    category: 'utilities'
  },
  {
    id: 'txn_7',
    accountId: 'acc_2',
    type: 'transfer_out',
    amount: 12.50,
    description: 'Coffee Shop',
    recipientAccount: '****2222',
    timestamp: '2024-01-09T11:20:00Z',
    status: 'completed',
    category: 'coffee'
  },
  {
    id: 'txn_8',
    accountId: 'acc_3',
    type: 'deposit',
    amount: 1000.00,
    description: 'Deposit - Cash',
    timestamp: '2024-01-08T13:10:00Z',
    status: 'completed',
    category: 'deposit'
  }
];
