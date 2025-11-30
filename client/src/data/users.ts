export interface User {
  username: string;
  password: string;
  role: 'admin' | 'user';
}

export const users: User[] = [
  {
    username: 'admin123',
    password: 'adminpass@123',
    role: 'admin'
  },
  {
    username: 'user123',
    password: 'userpass@123',
    role: 'user'
  }
];
