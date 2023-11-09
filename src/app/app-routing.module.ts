import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './login/auth.guard';
import { roleGuard } from './Shared/role.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'Books',
    // canActivate: [AuthGuard],

    loadChildren: () => import('./User/User.module').then((m) => m.UserModule),
  },
  {
    path: 'Admin',
    // canActivate: [AuthGuard],
    canActivate: [roleGuard],
    data: { preload: false, role: 'Admin' },
    loadChildren: () =>
      import('./Admin/Admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login',
    data: { preload: false },
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule],
  declarations: [PageNotFoundComponent, DashboardComponent],
})
export class AppRoutingModule {}
