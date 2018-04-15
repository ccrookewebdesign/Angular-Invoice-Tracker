import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/combineLatest';
//import 'rxjs/add/operator/map'
import * as fromStore from '../../store';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Invoice, Invoices } from '../../models/invoice.model';
import { Task, Tasks } from '../../models/task.model';
import { Client } from '../../models/client.model';

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
    delete payload.client;
    delete payload.tasks;
    const ref = this.afs.doc<Invoice>(`invoices/${payload.id}`).update(payload);
    return Observable.of<Invoice>(payload);
  }

  removeInvoice(payload: Invoice): Observable<Invoice> {
    const ref = this.afs.doc<Invoice>(`invoices/${payload.id}`).ref.delete();
    return Observable.of<Invoice>(payload);
  }

  getInvoice(): Observable<any> {
    let invoicesCollection$: Observable<Invoices[]>;
    return (invoicesCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getSelectedInvoice),
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getAllTasks),
      (selectedInvoice: any, clients: any[], tasks: any[]) => {
        let invoiceClient: Client = clients.find(
          client => client.id === selectedInvoice.clientId
        ) || {
          client: {}
        };

        let invoiceTasks: Tasks[] = tasks.filter(
          task => task.invoiceId === selectedInvoice.id
        );

        return {
          ...selectedInvoice,
          client: invoiceClient,
          tasks: invoiceTasks
        };
        //.filter(invoice => invoice.id === selectedInvoice.id);
      }
    ));
  }

  getInvoiceCollection(): Observable<Invoices[]> {
    let invoicesCollection$: Observable<Invoices[]>;
    return (invoicesCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllInvoices),
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getSelectedClient),
      this.store.select(fromStore.getAllTasks),
      (invoices: any[], clients: any[], selectedClient: any, tasks: any[]) => {
        return invoices
          .map(invoice => {
            let invoiceClient: Client = clients.find(
              client => client.id === invoice.clientId
            ) || {
              client: {}
            };

            let invoiceTasks: Tasks[] = tasks.filter(
              task => task.invoiceId === invoice.id
            );

            return { ...invoice, client: invoiceClient, tasks: invoiceTasks };
          })
          .filter(
            invoice =>
              invoice.clientId ===
              (selectedClient ? selectedClient.id : invoice.clientId)
          );
      }
    ));
  }

  /* getClientInvoices(): Observable<Invoices[]> {
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
  } */
}
