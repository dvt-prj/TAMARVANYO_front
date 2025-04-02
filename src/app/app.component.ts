import { Component, OnInit } from '@angular/core';
import { TvAppComponent} from './components/tv-app.component';
import { initFlowbite } from 'flowbite';

@Component({
    selector: 'app-root',
    imports: [ TvAppComponent],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  title = 'Tamar Vanyó';

  ngOnInit(): void {
    initFlowbite();
  }

}

