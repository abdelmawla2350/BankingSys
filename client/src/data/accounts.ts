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
    id: '990e8400-e29b-41d4-a716-446655440003',
    accountId: '770e8400-e29b-41d4-a716-446655440002',
    type: 'deposit',
    amount: 2500.00,
    description: 'Salary from company',
    timestamp: '2024-01-01T08:00:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440004',
    accountId: '770e8400-e29b-41d4-a716-446655440002',
    type: 'withdrawal',
    amount: 500.00,
    description: 'ATM withdrawal - Zamalek',
    timestamp: '2024-01-03T16:45:00Z',
    status: 'completed',
    category: 'withdrawal'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440005',
    accountId: '770e8400-e29b-41d4-a716-446655440002',
    type: 'transfer_out',
    amount: 1200.00,
    description: 'Monthly savings transfer',
    recipientAccount: '****0002',
    timestamp: '2024-01-05T10:00:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440006',
    accountId: '770e8400-e29b-41d4-a716-446655440004',
    type: 'deposit',
    amount: 3200.00,
    description: 'Monthly salary',
    timestamp: '2024-01-01T09:30:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440007',
    accountId: '770e8400-e29b-41d4-a716-446655440004',
    type: 'withdrawal',
    amount: 850.00,
    description: 'Grocery shopping - Carrefour',
    timestamp: '2024-01-04T18:20:00Z',
    status: 'completed',
    category: 'shopping'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440008',
    accountId: '770e8400-e29b-41d4-a716-446655440004',
    type: 'withdrawal',
    amount: 150.00,
    description: 'Coffee shop payment',
    timestamp: '2024-01-06T11:15:00Z',
    status: 'completed',
    category: 'coffee'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440009',
    accountId: '770e8400-e29b-41d4-a716-446655440005',
    type: 'deposit',
    amount: 4500.00,
    description: 'Freelance project payment',
    timestamp: '2024-01-02T14:00:00Z',
    status: 'completed',
    category: 'freelance'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440010',
    accountId: '770e8400-e29b-41d4-a716-446655440005',
    type: 'withdrawal',
    amount: 300.00,
    description: 'Gas station payment',
    timestamp: '2024-01-08T19:45:00Z',
    status: 'completed',
    category: 'utilities'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440011',
    accountId: '770e8400-e29b-41d4-a716-446655440005',
    type: 'transfer_out',
    amount: 2000.00,
    description: 'Investment transfer',
    recipientAccount: '****0005',
    timestamp: '2024-01-07T13:30:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440012',
    accountId: '770e8400-e29b-41d4-a716-446655440007',
    type: 'deposit',
    amount: 2800.00,
    description: 'Monthly salary',
    timestamp: '2024-01-01T10:00:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440013',
    accountId: '770e8400-e29b-41d4-a716-446655440007',
    type: 'transfer_out',
    amount: 1200.00,
    description: 'Rent payment to landlord',
    recipientAccount: '****0007',
    timestamp: '2024-01-01T12:00:00Z',
    status: 'completed',
    category: 'rent'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440014',
    accountId: '770e8400-e29b-41d4-a716-446655440008',
    type: 'deposit',
    amount: 3500.00,
    description: 'Business income',
    timestamp: '2024-01-03T11:30:00Z',
    status: 'completed',
    category: 'business'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440015',
    accountId: '770e8400-e29b-41d4-a716-446655440008',
    type: 'withdrawal',
    amount: 800.00,
    description: 'Restaurant payment',
    timestamp: '2024-01-05T20:15:00Z',
    status: 'completed',
    category: 'dining'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440016',
    accountId: '770e8400-e29b-41d4-a716-446655440008',
    type: 'transfer_out',
    amount: 2500.00,
    description: 'Business investment',
    recipientAccount: '****0008',
    timestamp: '2024-01-10T15:45:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440017',
    accountId: '770e8400-e29b-41d4-a716-446655440010',
    type: 'deposit',
    amount: 2200.00,
    description: 'Part-time job payment',
    timestamp: '2024-01-02T16:00:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440018',
    accountId: '770e8400-e29b-41d4-a716-446655440010',
    type: 'withdrawal',
    amount: 450.00,
    description: 'Pharmacy payment',
    timestamp: '2024-01-07T14:30:00Z',
    status: 'completed',
    category: 'healthcare'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440019',
    accountId: '770e8400-e29b-41d4-a716-446655440011',
    type: 'deposit',
    amount: 4100.00,
    description: 'Consulting fee',
    timestamp: '2024-01-04T09:15:00Z',
    status: 'completed',
    category: 'consulting'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440020',
    accountId: '770e8400-e29b-41d4-a716-446655440011',
    type: 'withdrawal',
    amount: 600.00,
    description: 'Online shopping',
    timestamp: '2024-01-09T17:20:00Z',
    status: 'completed',
    category: 'shopping'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440021',
    accountId: '770e8400-e29b-41d4-a716-446655440012',
    type: 'deposit',
    amount: 2900.00,
    description: 'Teaching salary',
    timestamp: '2024-01-01T08:30:00Z',
    status: 'completed',
    category: 'salary'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440022',
    accountId: '770e8400-e29b-41d4-a716-446655440012',
    type: 'transfer_out',
    amount: 1800.00,
    description: 'Family support',
    recipientAccount: '****0012',
    timestamp: '2024-01-06T10:45:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440023',
    accountId: '770e8400-e29b-41d4-a716-446655440014',
    type: 'deposit',
    amount: 5200.00,
    description: 'Engineering project payment',
    timestamp: '2024-01-03T13:00:00Z',
    status: 'completed',
    category: 'engineering'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440024',
    accountId: '770e8400-e29b-41d4-a716-446655440014',
    type: 'withdrawal',
    amount: 950.00,
    description: 'Electronics store',
    timestamp: '2024-01-08T16:10:00Z',
    status: 'completed',
    category: 'shopping'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440025',
    accountId: '770e8400-e29b-41d4-a716-446655440014',
    type: 'transfer_out',
    amount: 3000.00,
    description: 'Emergency savings',
    recipientAccount: '****0012',
    timestamp: '2024-01-12T11:30:00Z',
    status: 'completed',
    category: 'transfer'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440026',
    accountId: '770e8400-e29b-41d4-a716-446655440016',
    type: 'deposit',
    amount: 2600.00,
    description: 'Translation work payment',
    timestamp: '2024-01-02T15:20:00Z',
    status: 'completed',
    category: 'translation'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440027',
    accountId: '770e8400-e29b-41d4-a716-446655440016',
    type: 'withdrawal',
    amount: 350.00,
    description: 'Bookstore purchase',
    timestamp: '2024-01-11T14:50:00Z',
    status: 'completed',
    category: 'education'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440028',
    accountId: '770e8400-e29b-41d4-a716-446655440017',
    type: 'deposit',
    amount: 3800.00,
    description: 'Medical practice income',
    timestamp: '2024-01-05T12:15:00Z',
    status: 'completed',
    category: 'medical'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440029',
    accountId: '770e8400-e29b-41d4-a716-446655440017',
    type: 'withdrawal',
    amount: 700.00,
    description: 'Medical supplies',
    timestamp: '2024-01-13T09:40:00Z',
    status: 'completed',
    category: 'medical'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440030',
    accountId: '770e8400-e29b-41d4-a716-446655440018',
    type: 'deposit',
    amount: 3100.00,
    description: 'Graphic design project',
    timestamp: '2024-01-04T10:25:00Z',
    status: 'completed',
    category: 'design'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440031',
    accountId: '770e8400-e29b-41d4-a716-446655440018',
    type: 'withdrawal',
    amount: 520.00,
    description: 'Art supplies store',
    timestamp: '2024-01-14T16:35:00Z',
    status: 'completed',
    category: 'art'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440032',
    accountId: '770e8400-e29b-41d4-a716-446655440019',
    type: 'deposit',
    amount: 2700.00,
    description: 'IT consulting fee',
    timestamp: '2024-01-06T14:10:00Z',
    status: 'completed',
    category: 'consulting'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440033',
    accountId: '770e8400-e29b-41d4-a716-446655440019',
    type: 'withdrawal',
    amount: 400.00,
    description: 'Software license',
    timestamp: '2024-01-15T11:55:00Z',
    status: 'completed',
    category: 'software'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440034',
    accountId: '770e8400-e29b-41d4-a716-446655440020',
    type: 'deposit',
    amount: 2400.00,
    description: 'Content writing payment',
    timestamp: '2024-01-07T17:05:00Z',
    status: 'completed',
    category: 'writing'
  },
  {
    id: '990e8400-e29b-41d4-a716-446655440035',
    accountId: '770e8400-e29b-41d4-a716-446655440020',
    type: 'withdrawal',
    amount: 280.00,
    description: 'Stationery store',
    timestamp: '2024-01-16T13:25:00Z',
    status: 'completed',
    category: 'stationery'
  }
];
