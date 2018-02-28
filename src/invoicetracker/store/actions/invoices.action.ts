import { Action } from '@ngrx/store';

import { Invoice } from '../../models/invoice.model';

export const LOAD_INVOICES = '[Invoices] Load Invoices';
export const LOAD_INVOICES_FAIL = '[Invoices] Load Invoices Fail';
export const LOAD_INVOICES_SUCCESS = '[Invoices] Load Invoices Success';

export class LoadInvoices implements Action {
  readonly type = LOAD_INVOICES;
}

export class LoadInvoicesFail implements Action {
  readonly type = LOAD_INVOICES_FAIL;
  constructor(public payload: any) {}
}

export class LoadInvoicesSuccess implements Action {
  readonly type = LOAD_INVOICES_SUCCESS;
  constructor(public payload: Invoice[]) {}
}

export const CREATE_INVOICE = '[Invoices] Create Invoice';
export const CREATE_INVOICE_FAIL = '[Invoices] Create Invoice Fail';
export const CREATE_INVOICE_SUCCESS = '[Invoices] Create Invoice Success';

export class CreateInvoice implements Action {
  readonly type = CREATE_INVOICE;
  constructor(public payload: Invoice) {}
}

export class CreateInvoiceFail implements Action {
  readonly type = CREATE_INVOICE_FAIL;
  constructor(public payload: any) {}
}

export class CreateInvoiceSuccess implements Action {
  readonly type = CREATE_INVOICE_SUCCESS;
  constructor(public payload: Invoice) {}
}

export const UPDATE_INVOICE = '[Invoices] Update Invoice';
export const UPDATE_INVOICE_FAIL = '[Invoices] Update Invoice Fail';
export const UPDATE_INVOICE_SUCCESS = '[Invoices] Update Invoice Success';

export class UpdateInvoice implements Action {
  readonly type = UPDATE_INVOICE;
  constructor(public payload: Invoice) {}
}

export class UpdateInvoiceFail implements Action {
  readonly type = UPDATE_INVOICE_FAIL;
  constructor(public payload: any) {}
}

export class UpdateInvoiceSuccess implements Action {
  readonly type = UPDATE_INVOICE_SUCCESS;
  constructor(public payload: Invoice) {}
}

export const REMOVE_INVOICE = '[Invoices] Remove Invoice';
export const REMOVE_INVOICE_FAIL = '[Invoices] Remove Invoice Fail';
export const REMOVE_INVOICE_SUCCESS = '[Invoices] Remove Invoice Success';

export class RemoveInvoice implements Action {
  readonly type = REMOVE_INVOICE;
  constructor(public payload: Invoice) {}
}

export class RemoveInvoiceFail implements Action {
  readonly type = REMOVE_INVOICE_FAIL;
  constructor(public payload: any) {}
}

export class RemoveInvoiceSuccess implements Action {
  readonly type = REMOVE_INVOICE_SUCCESS;
  constructor(public payload: Invoice) {}
}

export type InvoicesAction =
  | LoadInvoices
  | LoadInvoicesFail
  | LoadInvoicesSuccess
  | CreateInvoice
  | CreateInvoiceFail
  | CreateInvoiceSuccess
  | UpdateInvoice
  | UpdateInvoiceFail
  | UpdateInvoiceSuccess
  | RemoveInvoice
  | RemoveInvoiceFail
  | RemoveInvoiceSuccess;
