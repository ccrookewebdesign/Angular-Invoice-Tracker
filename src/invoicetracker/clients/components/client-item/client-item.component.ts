import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'client-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['client-item.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>
        <a [routerLink]="['/invoicetracker/clients', client.id]">{{ client.clientName }}</a>
      </mat-card-title>
    </mat-card>
  `
})
export class ClientItemComponent {
  @Input() client: any;
}
