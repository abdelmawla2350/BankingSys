export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export const users: User[] = [
  {
    username: 'admin@nubank.com',
    password: 'password123',
    role: 'admin'
  },
  {
    username: 'mohamed.ahmed@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'fatma.khalil@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'ali.hassan@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'sara.mahmoud@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'youssef.ibrahim@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'nour.el-sayed@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'omar.farouk@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'aya.mostafa@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'karim.abdullah@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'layla.hussein@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'hassan.zaki@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'mariam.fathy@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'ahmed.salem@nu.edu.eg',
    password: 'password123',
    role: 'user'
  },
  {
    username: 'hana.elsayed@nu.edu.eg',
    password: 'password123',
    role: 'user'
  }
];
