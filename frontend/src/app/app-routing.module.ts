import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterViewComponent } from './register-view/register-view.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'dashboard/:id',
    component: RegisterViewComponent
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
