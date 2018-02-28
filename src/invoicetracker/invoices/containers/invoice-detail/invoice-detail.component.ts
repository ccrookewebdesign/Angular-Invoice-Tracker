import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../app/store';
import * as fromStore from '../../../store';

import * as firebase from 'firebase';

import { Invoice } from '../../../models/invoice.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'invoice-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['invoice-detail.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12">
          <h1>Invoice Detail</h1>          
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 col-lg-7">
          <invoice-form
            [invoice]="invoice$ | async"
            [clients]="clients$ | async"
            [selectedClient]="selectedClient$ | async"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)"
            (cancel)="onCancel($event)">        
          </invoice-form>
        </div>
      </div>
    </div>
  `
})
export class InvoiceDetailComponent implements OnInit {
  invoice$: Observable<Invoice>;
  clients$: Observable<Client[]>;
  selectedClient$: Observable<Client>;

  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  ngOnInit() {
    this.invoice$ = this.store.select(fromStore.getSelectedInvoice);
    this.clients$ = this.store.select(fromStore.getActiveClients);
    this.selectedClient$ = this.store.select(fromStore.getSelectedClient);
  }

  onCreate(event: Invoice) {
    event.createDate = firebase.firestore.FieldValue.serverTimestamp();
    this.store.dispatch(new fromStore.CreateInvoice(event));
  }

  onUpdate(event: Invoice) {
    this.store.dispatch(new fromStore.UpdateInvoice(event));
  }

  onRemove(event: Invoice) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveInvoice(event));
    }
  }

  onCancel(event: Invoice) {
    this.store.dispatch(new fromRoot.Back());
  }
}
