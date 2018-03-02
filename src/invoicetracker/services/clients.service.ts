import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import * as fromStore from '../store';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Client } from '../models/client.model';
import { Invoice } from '../models/invoice.model';
//
@Injectable()
export class ClientsService {
  constructor(
    private afs: AngularFirestore,
    private store: Store<fromStore.InvoiceTrackerState>
  ) {} // private http: HttpClient,

  getClients(): Observable<Client[]> {
    const ref = this.afs.collection<Client>('clients', ref =>
      ref.orderBy('clientName')
    );

    return ref.snapshotChanges().map(arr => {
      return arr.map(doc => {
        const data = doc.payload.doc.data();
        data.id = doc.payload.doc.id;
        return { id: doc.payload.doc.id, ...data } as Client;
      });
    });
  }

  createClient(payload: Client): Observable<Client> {
    const ref = this.afs.collection('clients').add(payload);
    return Observable.of<Client>(payload);
  }

  updateClient(payload: Client): Observable<Client> {
    const ref = this.afs.doc<Client>(`clients/${payload.id}`).update(payload);
    return Observable.of<Client>(payload);
  }

  removeClient(payload: Client): Observable<Client> {
    const ref = this.afs.doc<Client>(`clients/${payload.id}`).ref.delete();
    return Observable.of<Client>(payload);
  }

  getClientCollection(): Observable<Client[]> {
    let clientsCollection$: Observable<Client[]>;
    return (clientsCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getShowArchived),
      this.store.select(fromStore.getAllInvoices),
      (clients: any[], showArchived: any, invoices: any[]) => {
        return clients
          .map(client => {
            let clientInvoices: Invoice[] = invoices.filter(
              invoice => invoice.clientId === client.id
            );

            return { ...client, invoices: clientInvoices };
          })
          .filter(
            client => client.active === !showArchived //? true || false : !showArchived
          );
      }
    ));
  }
}
