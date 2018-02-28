import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromRoot from '../../app/store';
import * as fromStore from '../store';

import { Client } from '../models/client.model';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        return this.loggedIn();
      })
    );
  }

  loggedIn(): Observable<boolean> {
    return this.store
      .select(fromStore.getUserLoggedIn)
      .pipe(map(loggedIn => loggedIn), take(1));
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getUserLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.GetUser());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
