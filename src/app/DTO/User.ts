export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  email: string;
  phone: string;
  username?: string;
  password?: string;
  role?: string;
}
