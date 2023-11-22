import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { AuthGuard } from '../login/auth.guard';
import { roleGuard } from '../Shared/role.guard';
import { AddNewBookComponent } from './add-new-book/add-new-book.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: 'Books',
    // canActivate: [roleGuard],

    loadChildren: () =>
      import('./Books-Admin/book-detail-admin.module').then(
        (m) => m.BookDetailAdminModule
      ),
  },
  { path: 'Dashboard', component: DashboardAdminComponent },
  {
    path: 'Users',
    // canActivate: [roleGuard],

    loadChildren: () =>
      import('./Users-Admin/users-detail-admin.module').then(
        (m) => m.UsersDetailAdminModule
      ),
  },
  { path: 'AddBook', component: AddNewBookComponent },
];

@NgModule({
  declarations: [DashboardAdminComponent, AddNewBookComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AdminModule {}
