import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { EmployeeRoutes } from '@pages/master/employee/employee.routes';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent),
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'master',
                loadComponent: () => import('./pages/master/master.component').then(c => c.MasterComponent),
                children: [
                    {
                        path: '',
                        redirectTo: '/master/employee',
                        pathMatch: 'full'
                    },
                    {
                        path: 'employee',
                        children: EmployeeRoutes
                    }
                ]
            },
            {
                path: '',
                redirectTo: '/dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
    },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
