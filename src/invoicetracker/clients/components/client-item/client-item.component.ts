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
    <mat-card style="height: 300px!important;">
      <mat-card-title>
        <a [routerLink]="['/invoicetracker/clients', client.id]">{{ client.clientName }}</a>
      </mat-card-title>
      <invoices-table *ngIf="client.invoices.length" [clientId]="client.id" [invoices]="client.invoices.slice(0,3)" [fontSize]="'12px'"></invoices-table>
    </mat-card>
  `
})
export class ClientItemComponent {
  @Input() client: any;
}
