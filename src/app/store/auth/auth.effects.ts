import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { login, loginError, loginSuccess, loginSuccessFinal } from "./auth.actions";
import { catchError, exhaustMap, map, of, switchMap, tap } from "rxjs";
import Swal from "sweetalert2";
import { Injectable } from "@angular/core";
import { UserService } from "../../services/user.service";

@Injectable()
export class AuthEffects {

    login$ = createEffect(() => this.actions$.pipe(
        ofType(login),
        exhaustMap(action => this.service.loginUser({ username: action.username, password: action.password })
            .pipe(
                map(response => {
                    const token = response.token;
                    const payload = this.service.getPayload(token);

                    // Set the token in the service
                    this.service.token = token;

                    // Dispatch loginSuccess with basic user info
                    const loginData = {
                        user: { username: payload.sub },
                        isAuth: true,
                        isAdmin: payload.isAdmin
                    };

                    return loginSuccess({ login: loginData });
                }),
                catchError((error) => of(loginError({ error: error.error.message })))
            )
        )
    ));

    loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccess),
        switchMap(action => this.userService.findByUserName(action.login.user.username).pipe(
            map(user => {
                //console.log('useer', user);
                
                // Update the loginData with full user info
                const loginData = {
                    ...action.login,
                    userDB: user
                };

                // Store the user information in the service
                this.service.user = loginData;

                // Navigate to the /users route
                //this.router.navigate(['/users']);

                return loginSuccessFinal({ login: loginData });
            }),
            catchError((error) => of(loginError({ error: error.error.message })))
        ))
    ));

    loginSuccessFinal$ = createEffect(() => this.actions$.pipe(
        ofType(loginSuccessFinal),
        tap(() => {
            this.router.navigate(['/welcome']);
        })
    ), {dispatch: false})

    loginError$ = createEffect(() => this.actions$.pipe(
        ofType(loginError),
        tap((action) => {
            Swal.fire('Error en el Login', action.error, 'error');
        })
    ), { dispatch: false });

    constructor(
        private service: AuthService,
        private userService: UserService,
        private actions$: Actions,
        private router: Router
    ) { }
}