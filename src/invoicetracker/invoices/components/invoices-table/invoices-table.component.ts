import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Invoice, Invoices } from '../../../models/invoice.model';
//import { Client } from '../../../models/client.model';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'invoices-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./invoices-table.component.scss'],
  template: `
    <table [ngStyle]="{'font-size': fontSize}" class="invoicestable" *ngIf="invoices; let invoices; else loading">
    <tr class="headerrow">
      <td class="pl15"><span class="mousepointer">Invoice</span></td>
      <td *ngIf="clientId === null">Client</td>
      <td class="right">Due Date</td>
      <td *ngIf="clientId === null" class="right">Sent</td>
      <td class="right">Paid</td>
      <td class="right">Total</td>
      <td *ngIf="clientId === null && showLinks">&nbsp;</td>
    </tr>
    <tbody>
    <tr *ngIf="invoices.length === 0" class="fs12">
      <td colspan="5" class="pt25 strong em pb25">
        No invoices for this criteria. <a [routerLink]="['/invoicetracker/invoices/new']">Add new invoice</a>.
      </td>
    </tr>
    <tr [ngClass]="animateOnRouteEnter" *ngFor="let invoice of invoices">
      <td scope="row" class="pl15">
        <a [routerLink]="['/invoicetracker/invoices', invoice.id]">{{invoice.title}}</a>
      </td>
      <td *ngIf="clientId === null"><a [routerLink]="['/invoicetracker/clients', invoice.clientId]">{{invoice.client.clientName}}</a></td>
      <td class="right">{{invoice.dueDate | date: dateFormat}}</td>
      <td *ngIf="clientId === null" class="right">{{invoice.sentDate | date: dateFormat}}</td>
      <td class="right"><span (click)="setPaid()">{{invoice.invoicePaid ? 'Yes' : 'No'}}</span></td>
      <td class="right">{{calcTotal(invoice.invoiceTotal) | number}}</td>
      <td *ngIf="clientId === null && showLinks" class="right"><a [routerLink]="['/invoicetracker/invoices', invoice.id]">add/edit tasks</a></td>      
    </tr>
    <tr [ngClass]="animateOnRouteEnter" class="nohover" *ngIf="invoices.length !== 0">
      <td *ngIf="clientId !== null" scope="row"  class="pl15 strong" colspan="3">
        <a class="fs13" [routerLink]="['/invoicetracker/invoices/client', clientId]">view all invoices</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a class="fs13" [routerLink]="['/invoicetracker/invoices/new/client', clientId]">add new invoice</a>
      </td>  
      <td *ngIf="clientId === null" colspan="5">&nbsp;</td>      
      <td class="right strong table-totals">{{sumTotal | number}}</td>
      <td *ngIf="clientId === null && showLinks" >&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <ng-template #loading>Loading&hellip;</ng-template>
  `
})
export class InvoicesTableComponent {
  animateOnRouteEnter = 'route-enter-staggered';
  @Input() invoices: Invoice[];
  @Input() clientId: string = null;
  @Input() fontSize: string = '14px';
  @Input() dateFormat: string = 'MM/dd/yyyy';
  @Input() showLinks: boolean = true;

  sumTotal: number = 0;

  calcTotal(total: number) {
    this.sumTotal += +total;
    return total;
  }

  /* calcTotal(invoices: Invoice[]) {
    //this.sumTotal += +total;
    console.log('here: ' + invoices);
  } */

  setPaid() {
    console.log('123');
  }
}
