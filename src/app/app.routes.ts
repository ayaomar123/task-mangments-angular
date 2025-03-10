import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './guard/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    }, {
        path: 'login',
        component: LoginComponent
    }, {
        path: 'register',
        component: RegisterComponent
    }, {
        path: 'admin',
        component: LayoutComponent,
        canActivate:[authGuard],
        children: [
            {
                path: 'categories',
                component: CategoriesComponent
            }, {
                path: 'tasks',
                component: TasksComponent
            }
        ]
    },
];
