import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../app/store';
import * as fromStore from '../store';
import { tap, filter, take, map, switchMap, catchError } from 'rxjs/operators';

import * as userActions from '../store/actions/user.action';

import {
  ANIMATE_ON_ROUTE_ENTER,
  routerTransition
} from '../shared/animations/router.transition';

@Component({
  selector: 'home',
  animations: [routerTransition],
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {
  user$: Observable<any>;
  thisYear = new Date().getFullYear();

  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  ngOnInit() {
    this.user$ = this.store.select(fromStore.getUser);
    this.store.dispatch(new userActions.GetUser());
  }

  googleLogin() {
    this.store.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.store.dispatch(new userActions.Logout());
    return new fromRoot.Go({
      path: ['']
    });
  }
}
