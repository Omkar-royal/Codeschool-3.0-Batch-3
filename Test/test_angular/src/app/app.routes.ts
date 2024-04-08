import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EmployeeListComponent } from './home/employee-list/employee-list.component';
import { AddEmployeeComponent } from './home/add-employee/add-employee.component';
import { AddSalaryComponent } from './home/add-salary/add-salary.component';
import { ViewEmployeeComponent } from './home/view-employee/view-employee.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        data: { pageTitle: 'Home' },
        children: [
            {
                path: 'employees_list',
                component: EmployeeListComponent
            },

            {
                path: 'add_employee',
                component: AddEmployeeComponent
            },
            {
                path: 'view_employee_details/:employee_id',
                component: ViewEmployeeComponent
            },
            {
                path: 'add_salary',
                component: AddSalaryComponent
            },
            {
                path: '',
                redirectTo: '/employees_list',
                pathMatch: 'full'
            }
        ]

    },

    {
        path: 'sign_in',
        component: SignInComponent
    },
    {
        path: 'sign_up',
        component: SignUpComponent
    },
    // {
    //     path: '**',
    //     redirectTo: '',
    // }
];
