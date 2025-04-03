import { Routes } from '@angular/router';
import { FindComponent } from './find/find.component';
import { FormEmployeeComponent } from './form-employee/form-employee.component';
import { EmployeeComponent } from './employee.component';

export const EmployeeRoutes: Routes = [
    {
        path: '',
        component: EmployeeComponent,
        children: [
            {
                path: 'find',
                component: FindComponent
            },
            {
                path: 'form-employee',
                component: FormEmployeeComponent
            },
        ]
    }
];