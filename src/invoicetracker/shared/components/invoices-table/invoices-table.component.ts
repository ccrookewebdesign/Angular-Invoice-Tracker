import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Invoice, Invoices } from '../../../models/invoice.model';
//import { Client } from '../../../models/client.model';

//import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'invoices-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./invoices-table.component.scss'],
  template: `
    <table [ngStyle]="{'font-size': fontSize}" class="invoicestable" 
      *ngIf="invoices; let invoices; else loading">
    <tr class="headerrow">
      <td class="pl15"><span class="mousepointer">Invoice</span></td>
      <td *ngIf="clientId === null">Client</td>
      <td class="right" nowrap>Due Date</td>
      <td *ngIf="clientId === null" class="right mobileHide">Sent</td>
      <td class="right mobileHide">Paid</td>
      <td class="right">Total</td>
      <td class="mobileHide" *ngIf="clientId === null && showLinks">&nbsp;</td>
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
      <td class="right"
        [class.overdue]="!invoice.invoicePaid && today > invoice.dueDate"
        [class.paid]="invoice.invoicePaid">
        {{invoice.dueDate | date: dateFormat}}</td>
      <td *ngIf="clientId === null" 
        class="right mobileHide"
        [class.overdue]="!invoice.invoicePaid && today > invoice.dueDate"
        [class.paid]="invoice.invoicePaid">{{invoice.sentDate | date: dateFormat}}</td>
      <td class="right mobileHide"
        [class.paid]="invoice.invoicePaid"
        [class.overdue]="!invoice.invoicePaid && today > invoice.dueDate">
        <span class="invoice-paid" (click)="setPaid(invoice)">{{invoice.invoicePaid ? 'Yes' : 'No'}}</span>
      </td>
      <td class="right"
        [class.overdue]="!invoice.invoicePaid && today > invoice.dueDate"
        [class.paid]="invoice.invoicePaid">{{invoice.invoiceTotal | number}}</td>
      <td *ngIf="clientId === null && showLinks" class="right mobileHide"><a [routerLink]="['/invoicetracker/invoices', invoice.id]">add/edit tasks</a></td>      
    </tr>
    <tr [ngClass]="animateOnRouteEnter" class="nohover" *ngIf="invoices.length !== 0">
      <td *ngIf="clientId === null" colspan="3">&nbsp;</td>      
      <td *ngIf="clientId !== null" colspan="2">&nbsp;</td>
      <td *ngIf="clientId !== null" class="mobileHide">&nbsp;</td>
      <td class="mobileHide" *ngIf="clientId === null" colspan="2">&nbsp;</td>      
      <td class="right strong table-totals">{{sumTotal | number}}</td>
      <td class="mobileHide" *ngIf="clientId === null && showLinks" >&nbsp;</td>
    </tr>
    </tbody>
    </table>
    <ng-template #loading>Loading&hellip;</ng-template>
  `
})
export class InvoicesTableComponent implements OnInit {
  animateOnRouteEnter = 'route-enter-staggered';
  sumTotal: number = 0;
  today = new Date();

  @Input() invoices: Invoice[];
  @Input() clientId: string = null;
  @Input() fontSize: string = '';
  @Input() dateFormat: string = 'MM/dd/yyyy';
  @Input() showLinks: boolean = true;

  @Output() updatePaid = new EventEmitter<any>();

  ngOnInit() {
    this.sumTotal = this.calcTotal(this.invoices);
  }

  calcTotal(invoices: Invoice[]) {
    let tempTotal = 0;
    for (let invoice of this.invoices) {
      tempTotal += +invoice.invoiceTotal;
    }
    return tempTotal;
  }

  setPaid(invoice: Invoice) {
    this.updatePaid.emit(invoice);
  }
}
