import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './interceptors/token.interceptor';
import { provideStore } from '@ngrx/store';
import { usersReducer } from './store/users/users.reducer';
import { provideEffects } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { authReducer } from './store/auth/auth.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AuthEffects } from './store/auth/auth.effects';
import { TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideStore({
        users: usersReducer,
        auth: authReducer
    }),
    provideEffects(UsersEffects, AuthEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideHttpClient(), provideTransloco({
        config: { 
          availableLangs: ['es','ca'],
          defaultLang: 'ca',
          // Remove this option if your application doesn't support changing language in runtime.
          reRenderOnLangChange: true,
          prodMode: !isDevMode(),
        },
        loader: TranslocoHttpLoader
      })
]
};
