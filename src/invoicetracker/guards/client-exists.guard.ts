import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';

import { Client } from '../models/client.model';

@Injectable()
export class ClientExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.clientId;
        return this.hasClient(id);
      })
    );
  }

  hasClient(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getClientsEntities)
      .pipe(
        map((entities: { [key: string]: Client }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getClientsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadClients());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
