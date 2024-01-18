export interface IUser {
  id?: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  borrowedBooks?: number[];
  pendingBorrows?: number[];
}
