import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromInvoices from '../reducers/invoices.reducer';

import { Invoice } from '../../models/invoice.model';

export const getInvoiceState = createSelector(
  fromFeature.getInvoiceTrackerState,
  (state: fromFeature.InvoiceTrackerState) => state.invoices
);

export const getInvoicesEntities = createSelector(
  getInvoiceState,
  fromInvoices.getInvoicesEntities
);

export const getSelectedInvoice = createSelector(
  getInvoicesEntities,
  fromRoot.getRouterState,
  (entities, router): Invoice => {
    return router.state && entities[router.state.params.invoiceId];
  }
);

export const getAllInvoices = createSelector(getInvoicesEntities, entities => {
  //return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  return Object.keys(entities).map(id => entities[id]);
});
export const getInvoicesLoading = createSelector(
  getInvoiceState,
  fromInvoices.getInvoicesLoading
);
export const getInvoicesLoaded = createSelector(
  getInvoiceState,
  fromInvoices.getInvoicesLoaded
);

export const getClientInvoices = createSelector(
  getInvoicesEntities,
  fromRoot.getRouterState,
  (entities, router): Invoice[] => {
    return Object.keys(entities)
      .map(id => entities[id])
      .filter(invoice => invoice.clientId == router.state.params.clientId);
  }
);
