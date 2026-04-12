import { Routes } from "@angular/router";

export const guitarRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('../../pages/guitar-page-component/guitar-page.component'),
    },
    {
        path: 'create-guitar',
        loadComponent: () => import('../../components/guitar/guitar-create/guitar-create')
    },
    {
        path: ':id',
        loadComponent: () => import('../../components/guitar/guitar-by-id/guitar-by-id')
    },
    {
        path: '**',
        redirectTo: ''
    }
]
export default guitarRoutes