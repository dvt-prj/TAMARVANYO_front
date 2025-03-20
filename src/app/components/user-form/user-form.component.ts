import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { add, find, resetUser, update } from '../../store/users/users.actions';

@Component({
  selector: 'user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html'
})
export class UserFormComponent implements OnInit {

  user: User; // User object to bind to the form  
  errors: any = {}; // Object to hold form errors

  constructor(
    private store: Store<{users: any}>, // Injecting the store to manage state
    private route: ActivatedRoute // Injecting the route to access route parameters
  ) {
    this.user = new User(); // Initializing the user object

    // Subscribing to the store to get the user state and errors
    this.store.select('users').subscribe(state => {
      this.errors = state.errors; // Assigning errors from the state
      this.user = { ...state.user }; // Assigning user from the state
      console.log(this.user.name + " - " + this.user.admin); // Logging user name and admin status


    });
  }

  ngOnInit(): void {
    this.store.dispatch(resetUser()); // Dispatching action to reset the user state

    // Subscribing to route parameters to get the user ID
    this.route.paramMap.subscribe(params => {
      const id: number = +(params.get('id') || '0'); // Getting the user ID from the route

      if (id > 0) {
        this.store.dispatch(find({ id })); // Dispatching action to find the user by ID
      }
    });
  }

  onSubmit(userForm: NgForm): void {
    // Dispatching update or add action based on the user ID
    if (this.user.id > 0) {
      this.store.dispatch(update({ userUpdated: this.user }));
    } else {
      this.store.dispatch(add({ userNew: this.user }));
    }
  }

  onClear(userForm: NgForm): void {
    this.store.dispatch(resetUser()); // Dispatching action to reset the user state
    userForm.reset(); // Resetting the form
    userForm.resetForm(); // Resetting the form state
  }

}
