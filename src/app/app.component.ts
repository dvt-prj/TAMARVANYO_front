import { Component, OnInit } from '@angular/core';
import { UserAppComponent } from './components/user-app.component';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-root',
    imports: [ UserAppComponent],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'Tamar Vanyó';

  ngOnInit(): void {
    initFlowbite();
  }

}

