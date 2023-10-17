import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './Books/books.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from '../error.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart/cart.component';
import { AuthGuard } from '../login/auth.guard';

const routes: Routes = [
  { path: '', component: BooksComponent },
  {
    canActivate: [AuthGuard],
    path: 'Cart',
    component: CartComponent,
  },
];

@NgModule({
  declarations: [BooksComponent, ErrorComponent, CartComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class BooksModule {}
