import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslocoService} from '@ngneat/transloco';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'navbar',
  imports: [RouterModule, TranslocoModule],
  templateUrl: './navbar.component.html',
 /* providers: [
    {
      provide: TRANSLOCO_SCOPE,
      useValue: {
        scope: 'navbar',
        loader: (lang: string) => 
          import(`../../../assets/i18n/navbar/${lang}.json`).then(m => m.default) 
      }
    }
  ]*/
})
export class NavbarComponent {

  currentLanguage: string = 'ca';

  constructor(private authService: AuthService,
    private router: Router,
    private translocoService: TranslocoService
  ) { }

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

  switchLanguage() {
    this.currentLanguage ==='ca' ? this.currentLanguage = 'es' : this.currentLanguage = 'ca';
    this.translocoService.setActiveLang(this.currentLanguage);
  }

}
