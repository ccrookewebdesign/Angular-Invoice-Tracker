import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as invoiceActions from '../actions/invoices.action';
import * as fromServices from '../../services';

@Injectable()
export class InvoicesEffects {
  constructor(
    private actions$: Actions,
    private invoiceService: fromServices.InvoicesService
  ) {}

  @Effect()
  loadInvoices$ = this.actions$.ofType(invoiceActions.LOAD_INVOICES).pipe(
    switchMap(() => {
      return this.invoiceService.getInvoices().pipe(
        /*  map(invoices => {
          console.log(invoices);
        }), */
        map(invoices => new invoiceActions.LoadInvoicesSuccess(invoices)),
        catchError(error => of(new invoiceActions.LoadInvoicesFail(error)))
      );
    })
  );

  @Effect()
  createInvoice$ = this.actions$.ofType(invoiceActions.CREATE_INVOICE).pipe(
    map((action: invoiceActions.CreateInvoice) => action.payload),
    switchMap(invoice => {
      return this.invoiceService
        .createInvoice(invoice)
        .pipe(
          map(invoice => new invoiceActions.CreateInvoiceSuccess(invoice)),
          catchError(error => of(new invoiceActions.CreateInvoiceFail(error)))
        );
    })
  );

  @Effect()
  createInvoiceSuccess$ = this.actions$
    .ofType(invoiceActions.CREATE_INVOICE_SUCCESS)
    .pipe(
      map((action: invoiceActions.CreateInvoiceSuccess) => action.payload),
      map(
        invoice =>
          new fromRoot.Go({
            path: ['/invoicetracker/invoices']
          })
      )
    );

  @Effect()
  updateInvoice$ = this.actions$.ofType(invoiceActions.UPDATE_INVOICE).pipe(
    map((action: invoiceActions.UpdateInvoice) => action.payload),
    switchMap(invoice => {
      return this.invoiceService
        .updateInvoice(invoice)
        .pipe(
          map(invoice => new invoiceActions.UpdateInvoiceSuccess(invoice)),
          catchError(error => of(new invoiceActions.UpdateInvoiceFail(error)))
        );
    })
  );

  @Effect()
  removeInvoice$ = this.actions$.ofType(invoiceActions.REMOVE_INVOICE).pipe(
    map((action: invoiceActions.RemoveInvoice) => action.payload),
    switchMap(invoice => {
      return this.invoiceService
        .removeInvoice(invoice)
        .pipe(
          map(() => new invoiceActions.RemoveInvoiceSuccess(invoice)),
          catchError(error => of(new invoiceActions.RemoveInvoiceFail(error)))
        );
    })
  );

  @Effect()
  handleInvoiceSuccess = this.actions$
    .ofType(
      invoiceActions.UPDATE_INVOICE_SUCCESS,
      invoiceActions.REMOVE_INVOICE_SUCCESS
    )
    .pipe(
      map(invoice => {
        return new fromRoot.Go({
          path: ['/invoicetracker/invoices']
        });
      })
    );
}
