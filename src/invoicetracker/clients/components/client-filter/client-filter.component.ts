import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

import { map } from 'rxjs/operators';

@Component({
  selector: 'client-filter',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['client-filter.component.scss'],
  template: `
    <mat-checkbox disabled [ngModel]="showArchived" #ctrl="ngModel" 
    name="showArchived" (click)="toggleShowArchived(!showArchived)">
    <div class="checkbox-text">Show Archived Clients</div>
    </mat-checkbox>      
  `
})
export class ClientFilterComponent implements OnChanges {
  @Input() showArchived: boolean;

  /* @Output() selected = new EventEmitter<number[]>(); */
  @Output() toggle = new EventEmitter<boolean>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges) {
    /* if (this.client && this.client.id) {
      this.exists = true;
      this.form.patchValue(this.client);
    } */
  }

  toggleShowArchived(filter: boolean) {
    //console.log('toggle: ' + filter);
    this.toggle.emit(filter);
  }
}
