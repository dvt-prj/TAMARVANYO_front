import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, changePass, find, loadUser, resetUser, update } from '../../../store/users/users.actions';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthService } from '../../../services/auth.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'user-form',
  imports: [FormsModule, TranslocoModule, CommonModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit, AfterViewInit {

  private modal!: Modal; // Modal instance

  user: User; // User object to bind to the form  
  errors!: any; // Object to hold form errors

  userNou !: boolean;


  passwordsMismatch: boolean = false;
  newPasswordUgly: boolean = false;


  passwordsMismatchMain: boolean = false;
  newPasswordUglyMain: boolean = false;

  constructor(
    private authService: AuthService,
    private store: Store<{ users: any }>, // Injecting the store to manage state
    //private storeAuth: Store<{ auth: any }>,
    private route: ActivatedRoute // Injecting the route to access route parameters
  ) {
    this.user = new User(); // Initializing the user object

    // Subscribing to the store to get the user state and errors
    this.store.select('users').subscribe(state => {
      this.errors = state.errors; // Assigning errors from the state
      this.user = { ...state.user }; // Assigning user from the state            
    });
  }


  ngAfterViewInit() {
    const modalElement = document.getElementById('changePass-modal');

    if (modalElement) {
      this.modal = new Modal(modalElement);

      // Open modal on button click
      document.getElementById('openModalBtn')?.addEventListener('click', () => {
        console.log('✅ show');
        this.modal.show();
      });

      // Close modal on button click
      document.getElementById('closeModalBtn')?.addEventListener('click', () => {
        console.log('✅ hide');
        this.modal.hide();
      });

      console.log('✅ Modal initialized successfully');
    } else {
      console.error('❌ Modal element not found');
    }
  }


  ngOnInit(): void {
    this.store.dispatch(resetUser()); // Dispatching action to reset the user state

    // Subscribing to route parameters to get the user ID
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0'); // Getting the user ID from the route
      const currentUrl = this.route.snapshot.url.map(segment => segment.path).join('/');
      this.userNou = false;
      if (currentUrl === 'users/create') {
        this.userNou = true;
        //     this.store.dispatch(resetUser());
        console.log("Cargamos limpio");
      } else if (id > 0) {
        console.log("Cargamos por id");
        this.store.dispatch(find({ id })); // Dispatching action to find the user by ID
      } else {
        console.log("Cargamos por username");
        this.store.dispatch(loadUser({ username: this.authService.user.user.username }));
      }
    });
  }

  onSubmit(userForm: NgForm): void {

    //si es nova alta, comprovem pass
    if (this.userNou) {
      const password = userForm.value.password;
      const confirmPassword = userForm.value.rpassword;
      console.log(userForm.value.admin);
      if (password !== confirmPassword) {
        this.passwordsMismatchMain = true;
        return;
      }
      this.passwordsMismatchMain = false;
      if (!this.isValidPassword(password)) {
        this.newPasswordUglyMain = true;

        return;
      }
      this.newPasswordUglyMain = false;
     // this.store.dispatch(add({ userNew: this.user }));
    } else {
      // Dispatching update or add action based on the user ID
      if (this.user.id > 0) {
        this.store.dispatch(update({ userUpdated: this.user }));
      } else {
        this.store.dispatch(add({ userNew: this.user }));
      }
    }

  }

  onChangePassword(passForm: NgForm): void {
    const currentPassword = passForm.value.current1;
    const newPassword = passForm.value.newPass;
    const confirmPassword = passForm.value.newPass2;


    if (newPassword !== confirmPassword) {
      this.passwordsMismatch = true;
      return;
    }
    this.passwordsMismatch = false;
    if (!this.isValidPassword(newPassword)) {
      this.newPasswordUgly = true;

      return;
    }
    this.newPasswordUgly = false;

    // Call a service to update the password    
    this.store.dispatch(changePass({ idUser: this.user.id, currentPass: currentPassword, newPass: newPassword }));
  }

  /**
  * Validates password: 8-20 characters, at least one letter, one number, and one symbol.
  */
  isValidPassword(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!%?&.,-_])[A-Za-z\d!%?&.,-_]{8,20}$/;
    return passwordPattern.test(password);
  }

  resetFormPass(passForm: NgForm): void {
    console.log("resetFormPass");
    passForm.reset(); // Resetting the form
    passForm.resetForm(); // Resetting the form state

  }

  isAdmin() {
    return this.authService.isAdmin;
  }

  onClear(userForm: NgForm): void {
    this.store.dispatch(resetUser()); // Dispatching action to reset the user state
    userForm.reset(); // Resetting the form
    userForm.resetForm(); // Resetting the form state
  }

}
