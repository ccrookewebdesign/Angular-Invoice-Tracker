import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as clientActions from '../actions/clients.action';
import * as fromServices from '../../shared/services';

@Injectable()
export class ClientsEffects {
  constructor(
    private actions$: Actions,
    private clientService: fromServices.ClientsService
  ) {}

  @Effect()
  loadClients$ = this.actions$.ofType(clientActions.LOAD_CLIENTS).pipe(
    switchMap(() => {
      return this.clientService.getClients().pipe(
        /*  map(clients => {
          console.log(clients);
        }), */
        map(clients => new clientActions.LoadClientsSuccess(clients)),
        catchError(error => of(new clientActions.LoadClientsFail(error)))
      );
    })
  );

  @Effect()
  createClient$ = this.actions$.ofType(clientActions.CREATE_CLIENT).pipe(
    map((action: clientActions.CreateClient) => action.payload),
    switchMap(client => {
      return this.clientService
        .createClient(client)
        .pipe(
          map(client => new clientActions.CreateClientSuccess(client)),
          catchError(error => of(new clientActions.CreateClientFail(error)))
        );
    })
  );

  @Effect()
  createClientSuccess$ = this.actions$
    .ofType(clientActions.CREATE_CLIENT_SUCCESS)
    .pipe(
      map((action: clientActions.CreateClientSuccess) => action.payload),
      map(
        client =>
          new fromRoot.Go({
            path: ['/invoicetracker/clients']
          })
      )
    );

  @Effect()
  updateClient$ = this.actions$.ofType(clientActions.UPDATE_CLIENT).pipe(
    map((action: clientActions.UpdateClient) => action.payload),
    switchMap(client => {
      return this.clientService
        .updateClient(client)
        .pipe(
          map(client => new clientActions.UpdateClientSuccess(client)),
          catchError(error => of(new clientActions.UpdateClientFail(error)))
        );
    })
  );

  @Effect()
  removeClient$ = this.actions$.ofType(clientActions.REMOVE_CLIENT).pipe(
    map((action: clientActions.RemoveClient) => action.payload),
    switchMap(client => {
      return this.clientService
        .removeClient(client)
        .pipe(
          map(() => new clientActions.RemoveClientSuccess(client)),
          catchError(error => of(new clientActions.RemoveClientFail(error)))
        );
    })
  );

  @Effect()
  handleClientSuccess = this.actions$
    .ofType(
      clientActions.UPDATE_CLIENT_SUCCESS,
      clientActions.REMOVE_CLIENT_SUCCESS
    )
    .pipe(
      map(client => {
        return new fromRoot.Go({
          path: ['/invoicetracker/clients']
        });
      })
    );
}
