import { Routes } from "@angular/router";

export const userRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../../pages/user/user')
  },
  {
    path: 'create-user',
    loadComponent: () => import('../../components/user/user-create/user-create')
  },
  {
    path: ':id',
    loadComponent: () => import('../../components/user/user-by-id/user-by-id')
  },
  {
    path: '**',
    redirectTo: ''
  }
]

export default userRoutes;