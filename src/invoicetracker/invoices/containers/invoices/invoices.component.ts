import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromInvoiceService from '../../../services';

import { Invoices } from '../../../models/invoice.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'invoices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./invoices.component.scss'],
  template: `
  <div class="container">
    <!-- <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-12 col-lg-12"><h1>Invoices</h1></div>
    </div> -->
    
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-4 col-lg-4"><h1>Invoices</h1></div>
      <div class="col-md-8 col-lg-8 right">
        <div style="position: absolute; bottom: 8px; right: 20px;">
          <span><a [routerLink]="['/invoicetracker/invoices/', 'new']" class="clients-menu">Add New Invoice</a></span>
        </div>  
      </div>
    </div>
    
    <div class="row align-items-end" *ngIf="invoicesCollection$ | async; let invoices;">
      <div *ngIf="!((invoices).length)">
          No invoices, add one to get started.
      </div>
      <!-- <div>{{ invoices | json }}</div> -->
      <div class="col-md-12 col-lg-12 client-padding">
        <mat-card [ngClass]="animateOnRouteEnter">
          <invoices-table [invoices]="invoices"></invoices-table>
        </mat-card>  
      </div>    
    </div>
  </div>  
  `
})
export class InvoicesComponent implements OnInit {
  invoicesCollection$: Observable<Invoices[]>;
  //client$: Observable<Client>;
  test = 10;
  constructor(private invoiceService: fromInvoiceService.InvoicesService) {}

  ngOnInit() {
    this.invoicesCollection$ = this.invoiceService.getInvoiceCollection();
  }
}
