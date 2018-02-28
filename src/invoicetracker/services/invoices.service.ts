import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/combineLatest';

import * as fromStore from '../store';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Invoice, Invoices } from '../models/invoice.model';
import { Task, Tasks } from '../models/task.model';
import { Client } from '../models/client.model';

@Injectable()
export class InvoicesService {
  constructor(
    private afs: AngularFirestore,
    private store: Store<fromStore.InvoiceTrackerState>
  ) {}

  getInvoices(): Observable<Invoice[]> {
    const ref = this.afs.collection<Invoice>('invoices', ref =>
      ref.orderBy('dueDate', 'desc')
    );

    return ref.snapshotChanges().map(arr => {
      return arr.map(doc => {
        const data = doc.payload.doc.data();
        data.id = doc.payload.doc.id;
        return { id: doc.payload.doc.id, ...data } as Invoice;
      });
    });
  }

  createInvoice(payload: Invoice): Observable<Invoice> {
    const ref = this.afs.collection('invoices').add(payload);

    return Observable.of<Invoice>(payload);
  }

  updateInvoice(payload: Invoice): Observable<Invoice> {
    const ref = this.afs.doc<Invoice>(`invoices/${payload.id}`).update(payload);
    return Observable.of<Invoice>(payload);
  }

  removeInvoice(payload: Invoice): Observable<Invoice> {
    const ref = this.afs.doc<Invoice>(`invoices/${payload.id}`).ref.delete();
    return Observable.of<Invoice>(payload);
  }

  getInvoiceCollection(): Observable<Invoices[]> {
    let invoicesCollection$: Observable<Invoices[]>;
    return (invoicesCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllInvoices),
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getSelectedClient),
      (invoices: any[], clients: any[], selectedClient: any) => {
        return invoices
          .map(invoice => {
            let invoiceClient: Client = clients.find(
              client => client.id === invoice.clientId
            ) || {
              client: {}
            };
            // return Object.assign({}, invoice, { client: invoiceClient });
            return { ...invoice, client: invoiceClient };
          })
          .filter(
            invoice =>
              invoice.clientId ===
              (selectedClient ? selectedClient.id : invoice.clientId)
          );
      }
    ));
  }

  getClientInvoices(): Observable<Invoices[]> {
    let clientInvoices$: Observable<Invoices[]>;
    return (clientInvoices$ = Observable.combineLatest(
      this.store.select(fromStore.getClientInvoices),
      this.store.select(fromStore.getSelectedClient),
      (invoices: any[], client: any) => {
        return invoices.map(invoice => {
          let invoiceClient: Client = client;
          // return Object.assign({}, invoice, { client: invoiceClient });
          return { ...invoice, client: invoiceClient };
        });
      }
    ));
  }
}
