import { Routes } from '@angular/router';
import { authGuard } from '@guards/auth.guard';
import { EmployeeComponent } from '@pages/master/employee/employee.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent),
        canActivate: [authGuard],
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
            {
                path: 'employee',
                loadComponent: () => import('./pages/master/employee/employee.component').then(c => c.EmployeeComponent),
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(c => c.LoginComponent),
    },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent) }
];
