import { Routes } from '@angular/router';
import { AuthenticatedPage } from './pages/authenticated/authenticated.page';
import { HomePage } from './features/home/home.page';
import { AuthGuard } from './common/guard/auth.guard';
import {ProfilePage} from './features/profile/profile.page';

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
      },
      {
        path: 'profile',
        component: ProfilePage
      }
    ]
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
