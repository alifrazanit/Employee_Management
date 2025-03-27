import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./template/template.component').then(c => c.TemplateComponent),
        children: [
            {
                path: '',
                loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
            },
        ]
    },
    { path: '**', loadComponent: () => import('./pages/notfound/notfound.component').then(c => c.NotfoundComponent) }
];
