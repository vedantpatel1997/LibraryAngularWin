export interface IssueBook {
  bookId: number;
  userId?: number;
  issueDate: string; // convert date to .toISOString()
  days: number;
  returned: boolean;
}
