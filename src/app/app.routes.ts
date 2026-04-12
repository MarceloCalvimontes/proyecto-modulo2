import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/counter/counter-page.component')
  },
  {
    path: 'hero',
    loadComponent: () => import('./pages/hero/hero-page.component')
  },
  {
    path: 'dragonball',
    loadComponent: () => import('./pages/dragonball-page.component/dragonball-page.component')
  },
  {
    path: 'dragonball-super',
    loadComponent: () => import('./pages/dragonball-super/dragonball-super')
  },
  {
    path: 'users',
    loadChildren: () => import('./pages/user/user.routes'),
  },
  {
    path: 'guitars',
    loadChildren: () => import('./pages/guitar-page-component/guitar.routes'),
  },
  {
    path: '**',
    redirectTo: ''
  }
];
