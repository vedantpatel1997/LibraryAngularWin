import { Address } from './Address';

export interface BillingDeatils {
  billingSummary: BillingSummary;
  billingBooksInfo: BillingBooksInfo[];
}

export interface BillingSummary {
  billingId?: number;
  userId: number;
  userFirstName?: string;
  userLastName?: string;
  userEmail?: string;
  userPhone?: string;
  date?: string;
  address?: Address;
  bookQuantity: number;
  delivery: boolean;
  pickup: boolean;
  tax: number;
  totalAmount: number;
  addressId: number;
  billingBooksInfos?: BillingBooksInfo[];
}

export interface BillingBooksInfo {
  BillingBooksInfo?: number;
  bookId: number;
  bookName?: string;
  bookAuthor?: string;
  bookCategory?: string;
  bookImageUrl?: string;
  rentDays: number;
  estimatedReturnDate: string;
  bookOriginalPrice: number;
  bookRentPrice: number;
  billingId?: number;
}
