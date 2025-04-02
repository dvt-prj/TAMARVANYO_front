import { Routes } from '@angular/router';
import { ListUsersComponent } from './components/users/listUsers/listUser.component';
import { UserFormComponent } from './components/users/user-form/user-form.component';
import { AuthComponent } from './components/auth/auth.component';
import {  authGuardAdmin, authGuardUser } from './guards/auth.guard';
import { Forbidden403Component } from './components/forbidden403/forbidden403.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login'
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [authGuardUser]
    },
    {
        path: 'users/page/:page',
        component: ListUsersComponent,
        canActivate: [authGuardUser]
    },
    {
        path: 'users/create',
        component: UserFormComponent,
        canActivate: [authGuardAdmin]
    },
    {
        path: 'user/info',
        component: UserFormComponent,
        canActivate: [authGuardUser]
    },
     {
         path: 'users/edit/:id',
         component: UserFormComponent,
         canActivate: [authGuardAdmin]
    },
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'forbidden',
        component: Forbidden403Component,
        canActivate: [authGuardUser]
    }

];
