import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { ReportsAdminComponent } from './reports-Admin/reports-admin.component';
import { AuthGuard } from '../login/auth.guard';
import { roleGuard } from '../Shared/role.guard';

const routes: Routes = [
  {
    path: 'Books',
    canActivate: [roleGuard],

    loadChildren: () =>
      import('./Books-Admin/book-detail-admin.module').then(
        (m) => m.BookDetailAdminModule
      ),
  },
  { path: 'Dashboard', component: DashboardAdminComponent },
  {
    path: 'Users',
    canActivate: [roleGuard],

    loadChildren: () =>
      import('./Users-Admin/users-detail-admin.module').then(
        (m) => m.UsersDetailAdminModule
      ),
  },
  { path: 'Reports', component: ReportsAdminComponent },
];

@NgModule({
  declarations: [DashboardAdminComponent, ReportsAdminComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class AdminModule {}
