import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromClients from './clients.reducer';
import * as fromTasks from './tasks.reducer';
import * as fromInvoices from './invoices.reducer';
import * as fromUser from './user.reducer';

export interface InvoiceTrackerState {
  clients: fromClients.ClientState;
  tasks: fromTasks.TaskState;
  invoices: fromInvoices.InvoiceState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<InvoiceTrackerState> = {
  clients: fromClients.reducer,
  tasks: fromTasks.reducer,
  invoices: fromInvoices.reducer,
  user: fromUser.reducer
};

export const getInvoiceTrackerState = createFeatureSelector<
  InvoiceTrackerState
>('invoicetracker');
