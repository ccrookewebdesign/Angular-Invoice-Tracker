import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';

import { Invoice } from '../models/invoice.model';

@Injectable()
export class InvoiceExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.invoiceId;
        return this.hasInvoice(id);
      })
    );
  }

  hasInvoice(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getInvoicesEntities)
      .pipe(
        map((entities: { [key: string]: Invoice }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getInvoicesLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadInvoices());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
