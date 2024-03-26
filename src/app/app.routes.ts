import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './features/home/home.page';
import { AuthGuard } from './common/guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'authenticated',
    component: AuthenticatedPage,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomePage
      }
    ]
  },
  {
    path: 'profile/options',
    loadComponent: () => import('./features/profile/profile-options/profile-options.page').then(m => m.ProfileOptionsPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile.page').then(m => m.ProfilePage),
    canActivate: [AuthGuard]
  },
  {
    path: 'change/password',
    loadComponent: () => import('./features/profile/change-password/change-password.page').then( m => m.ChangePasswordPage),
    canActivate: [AuthGuard]
  },
  {
    path: 'landing',
    loadComponent: () => import('./pages/landing/landing.page').then( m => m.LandingPage)
  },
  {
    path: 'sign/up',
    loadComponent: () => import('./features/authentication/pages/sign-up/sign-up.page').then(m => m.SignUpPage)
  },
  {
    path:'register',
    loadComponent: () => import('./features/authentication/pages/register/register.component').then(m => m.RegisterComponent),
    canActivate: [AuthGuard]
  },
   {
    path: 'login',
    loadComponent: () => import('./features/authentication/pages/login/login.component').then(m => m.LoginComponent)
   }
];
