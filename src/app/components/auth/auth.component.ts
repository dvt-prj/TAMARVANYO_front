import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';

import { TranslocoModule } from '@ngneat/transloco';

import {
  inputClass,
  labelClass,
  primaryButtonClass
} from '../../../styles/tailwind-classes';

@Component({
    selector: 'app-auth',
    imports: [FormsModule, TranslocoModule,CommonModule],
    templateUrl: './auth.component.html'
})
export class AuthComponent {

  labelClass = labelClass;
  inputClass =inputClass;
  primaryButtonClass =primaryButtonClass;

  user: User;

  constructor(private store: Store<{auth: any}>
  ) {
    this.user = new User();
  }

  onSubmit() {
    if (!this.user.username || !this.user.password) {
      Swal.fire(
        'Error de validacion',
        'Username y password requeridos!',
        'error'
      );
    } else {
      this.store.dispatch(login({ username: this.user.username, password: this.user.password }));
    }
  }

  
}
