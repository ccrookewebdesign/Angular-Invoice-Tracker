import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Invoice } from './../../../models/invoice.model';

@Component({
  selector: 'client-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./client-item.component.scss'],
  template: `
    <mat-card style="height: 300px!important;">
      <mat-card-title>
        <a [routerLink]="['/invoicetracker/clients', client.id]">{{ client.clientName }}</a>
      </mat-card-title>
      <invoices-table 
        *ngIf="client.invoices.length" 
        [clientId]="client.id" 
        [invoices]="client.invoices.slice(0,3)" 
        [fontSize]="'12px'"
        (updatePaid)="setPaid($event)"></invoices-table> <!--  -->
    </mat-card>
  `
})
export class ClientItemComponent {
  @Input() client: any;

  @Output() updatePaid = new EventEmitter<any>();

  setPaid(invoice: Invoice) {
    //console.log(invoice);
    this.updatePaid.emit(invoice);
  }
}
