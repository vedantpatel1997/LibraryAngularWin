import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books.component';
import { CommonModule } from '@angular/common';
import { ErrorComponent } from './error.component';

const routes: Routes = [{ path: '', component: BooksComponent }];

@NgModule({
  declarations: [BooksComponent, ErrorComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class BooksModule {}
