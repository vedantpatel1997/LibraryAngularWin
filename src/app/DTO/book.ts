import { Category } from './Category';

export interface Book {
  id: number;
  bookId: number;
  title: string;
  author: string;
  totalQuantity: number;
  availableQuantity: number;
  issuedQuantity: number;
  price: number;
  category: Category;
  rentPeriod?: number;
  totalRentPrice: number;
  categoryName?: string;
}
