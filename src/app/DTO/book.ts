import { Category } from './Category';

export interface Book {
  bookId: number;
  title: string;
  author: string;
  totalQuantity: number;
  availableQuantity: number;
  issuedQuantity: number;
  price: number;
  category: Category;
}
