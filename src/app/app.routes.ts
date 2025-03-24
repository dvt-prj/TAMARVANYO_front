import { Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
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
        path: 'users',
        component: UserComponent,
        canActivate: [authGuardUser]
    },
    {
        path: 'welcome',
        component: WelcomeComponent,
        canActivate: [authGuardUser]
    },
    {
        path: 'users/page/:page',
        component: UserComponent,
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
    /* {
         path: 'users/edit/:id',
         component: UserFormComponent,
         canActivate: [authGuard]
    },*/
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
