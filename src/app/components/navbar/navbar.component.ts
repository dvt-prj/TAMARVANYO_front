import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'navbar',
    imports: [RouterModule],
    templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private authService: AuthService,
    private router: Router
  ){}

  get login() {
    return this.authService.user;
  }

  get admin() {
    return this.authService.isAdmin();
  }

  handlerLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  get fullname() {
    const userDB = this.login?.userDB;
    if (userDB) {
      const { name, lastname, lastname2 } = userDB;
      return [name, lastname, lastname2].filter(Boolean).join(' ');
    }
    return '';
  }
}
