import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { User } from '../../models/user.model';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

import * as fromRoot from '../../../app/store';
import { Observable } from 'rxjs/Observable';

import * as userActions from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private afAuth: AngularFireAuth) {}

  @Effect()
  getUser: Observable<userActions.UserAction> = this.actions
    .ofType(userActions.GET_USER)
    .pipe(
      map((action: userActions.GetUser) => action.payload),
      switchMap(payload => this.afAuth.authState),
      map(authData => {
        if (authData) {
          /// User logged in
          const user = { uid: authData.uid, displayName: authData.displayName };
          return new userActions.Authenticated(user);
        } else {
          /// User not logged in
          return new userActions.NotAuthenticated();
        }
      }),
      catchError(err => Observable.of(new userActions.AuthError()))
    );

  @Effect()
  login: Observable<userActions.UserAction> = this.actions
    .ofType(userActions.GOOGLE_LOGIN)
    .pipe(
      map((action: userActions.GoogleLogin) => action.payload),
      switchMap(payload => {
        return Observable.fromPromise(this.googleLogin());
      }),
      map(credential => {
        return new userActions.GetUser();
      }),
      catchError(err => {
        return Observable.of(new userActions.AuthError({ error: err.message }));
      })
    );

  private googleLogin(): Promise<any> {
    //const provider = new firebase.auth.GoogleAuthProvider();
    //return this.afAuth.auth.signInWithPopup(provider);
    return this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(
      'boomdaddy@ccrooke.com',
      'pwd4Firebase!'
    );
  }

  @Effect()
  logout: Observable<userActions.UserAction> = this.actions
    .ofType(userActions.LOGOUT)
    .pipe(
      map((action: userActions.Logout) => action.payload),
      switchMap(payload => {
        return Observable.of(this.afAuth.auth.signOut());
      }),
      map(authData => {
        return new userActions.NotAuthenticated();
      }),
      catchError(err =>
        Observable.of(new userActions.AuthError({ error: err.message }))
      )
    );

  @Effect()
  handleLogoutSuccess = this.actions.ofType(userActions.NOT_AUTHENTICATED).pipe(
    map(arr => {
      //clear state (clientFilter, etc)
      return new fromRoot.Go({
        path: ['/invoicetracker/']
      });
    })
  );

  /* @Effect()
  handleLoginSuccess = this.actions.ofType(userActions.AUTHENTICATED).pipe(
    map(arr => {
      return new fromRoot.Go({
        path: ['/invoicetracker/dashboard']
      });
    })
  ); */
}
