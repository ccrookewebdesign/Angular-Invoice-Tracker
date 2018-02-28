import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Client } from '../models/client.model';

@Injectable()
export class ClientsService {
  constructor(private http: HttpClient, private afs: AngularFirestore) {}

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
}
