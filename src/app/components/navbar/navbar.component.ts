import { Component, OnInit,ViewEncapsulation  } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslocoService } from '@ngneat/transloco';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'navbar',
  imports: [RouterModule, TranslocoModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class NavbarComponent implements OnInit {

  currentLanguage: string = 'ca';

  isDarkMode: boolean = true;

  constructor(private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService
  ) { }

  ngOnInit() {
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

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
    if (this.login.userDB)
      return this.login.userDB.name;
    else return '';
    /*const userDB = this.login?.userDB;
    if (userDB) {
      const { name, lastname, lastname2 } = userDB;
      return [name, lastname, lastname2].filter(Boolean).join(' ');
    }
    return '';*/
  }

  switchLanguage() {
    this.currentLanguage === 'ca' ? this.currentLanguage = 'es' : this.currentLanguage = 'ca';
    this.translocoService.setActiveLang(this.currentLanguage);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

}
