import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './login/auth.guard';
import { roleGuard } from './Shared/role.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    canActivate: [roleGuard],
    data: { preload: false },
    loadChildren: () =>
      import('./Books/books.module').then((m) => m.BooksModule),
  },
  {
    path: 'login',
    data: { preload: false },
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: [PageNotFoundComponent],
})
export class AppRoutingModule {}
