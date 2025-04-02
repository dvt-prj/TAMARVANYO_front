import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
    selector: 'tv-app',
    imports: [RouterOutlet, NavbarComponent],
    templateUrl: './tv-app.component.html',
    styleUrls: ['./tv-app.component.css']
})
export class TvAppComponent {}

