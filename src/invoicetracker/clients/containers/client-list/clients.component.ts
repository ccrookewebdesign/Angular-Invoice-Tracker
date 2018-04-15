import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import * as firebase from 'firebase';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../../../store';

import * as fromClientService from '../../../shared/services';

import { Client } from '../../../models/client.model';
import { Invoice, Invoices } from '../../../models/invoice.model';

@Component({
  selector: 'clients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./clients.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-sm-12 col-md-6 col-lg-4"><h1>Clients</h1></div>
        <div class="col-sm-12 col-md-6 col-lg-8 clientmenu">
          <div style="">
            <client-filter (toggle)="updateFilter($event)" [showArchived]="showArchived$ | async"></client-filter>
            <span><a [routerLink]="['/invoicetracker/clients/', 'new']" class="clients-menu">Add New Client</a></span>
          </div>
        </div>
      </div>
      <div class="row align-items-end" *ngIf="clients$ | async; let clients;">
        <div *ngIf="!((clients).length)">
            No clients, add one to get started.
        </div>
        
        <div [ngClass]="animateOnRouteEnter" *ngFor="let client of clients"  class="col-md-6 col-lg-6">
          <client-item 
            [client]="client"
            (updatePaid)="updatePaid($event)"></client-item>
        </div>    
      </div>
    </div>  
  `
})
export class ClientsComponent implements OnInit {
  animateOnRouteEnter = 'route-enter-staggered';
  showArchived$: Observable<boolean>;
  clients$: Observable<Client[]>;

  constructor(
    private store: Store<fromStore.InvoiceTrackerState>,
    private clientService: fromClientService.ClientsService,
    private invoiceService: fromClientService.InvoicesService
  ) {}

  ngOnInit() {
    this.clients$ = this.clientService.getClientCollection();
    this.showArchived$ = this.store.select(fromStore.getShowArchived);
  }

  updatePaid(event: Invoice) {
    let x = { ...event };
    x.invoicePaid = !x.invoicePaid;
    if (x.invoicePaid) {
      x.paidDate = firebase.firestore.FieldValue.serverTimestamp();
    } else {
      x.paidDate = null;
    }

    this.invoiceService.updateInvoice(x);
  }

  updateFilter(event: boolean) {
    this.store.dispatch(new fromStore.ToggleShowArchived(event));
  }
}
