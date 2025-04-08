import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'paginator',
    imports: [RouterModule, CommonModule],
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent {

  @Input() url: string = '';
  @Input() paginator: any = {};
}
