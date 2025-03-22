import { createReducer, on } from "@ngrx/store"
import { loginSuccess, loginSuccessFinal, logout } from "./auth.actions"
import { User } from "../../models/user";

export const initialLogin = {
    isAuth: false,
    isAdmin: false,
    user: undefined,
    userDB: User,
}

const initialState = JSON.parse(sessionStorage.getItem('login') || JSON.stringify(initialLogin));

export const authReducer = createReducer(
    initialState,
    on(loginSuccess, (state, { login }) => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user
        }
    )),
    on(loginSuccessFinal, (state, { login }) => (
        {
            isAuth: true,
            isAdmin: login.isAdmin,
            user: login.user,
            userDB:login.userDB
        }
    )),
    on(logout, (state) => ({... initialLogin}))
)