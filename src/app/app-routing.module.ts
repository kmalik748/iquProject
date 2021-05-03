import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {AdminGuardGuard} from './admin-guard.guard';

const routes: Routes = [
  {
    path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'user-dashboard',
    loadChildren: () => import('./user-dashboard/userDashboard.module').then(m => m.UserDashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./admin-home/admin-home.module').then(m => m.AdminHomeModule),
    canActivate: [AdminGuardGuard]
  },
  {
    path: 'admin-signals',
    loadChildren: () => import('./admin-signals/admin-signals.module').then(m => m.AdminSignalsModule),
    canActivate: [AdminGuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
