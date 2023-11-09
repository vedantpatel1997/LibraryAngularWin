import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from '../dashboard-admin/dashboard-admin.component';
import { UsersAdminComponent } from './users-admin.component';
import { BooksAdminComponent } from '../Books-Admin/books-admin.component';
import { ReportsAdminComponent } from '../reports-Admin/reports-admin.component';

const routes: Routes = [
  { path: 'Dashboard', component: DashboardAdminComponent },
  { path: 'Users', component: UsersAdminComponent },
  { path: 'Books', component: BooksAdminComponent },
  { path: 'Reports', component: ReportsAdminComponent },
];
@NgModule({
  declarations: [
    UsersAdminComponent,
    BooksAdminComponent,
    DashboardAdminComponent,
    ReportsAdminComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
