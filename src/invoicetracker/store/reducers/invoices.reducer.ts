import * as fromInvoices from '../actions/invoices.action';
import { Invoice } from '../../models/invoice.model';

export interface InvoiceState {
  entities: { [id: string]: Invoice };
  loaded: boolean;
  loading: boolean;
}

export const initialState: InvoiceState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromInvoices.InvoicesAction
): InvoiceState {
  switch (action.type) {
    case fromInvoices.LOAD_INVOICES: {
      return {
        ...state,
        loading: true
      };
    }
    case fromInvoices.LOAD_INVOICES_SUCCESS: {
      const invoices = action.payload;
      //console.log('reducer: ' + JSON.stringify(invoices));
      const entities = invoices.reduce(
        (entities: { [id: string]: Invoice }, invoice: Invoice) => {
          return {
            ...entities,
            [invoice.id]: invoice
          };
        },
        {
          ...state.entities
        }
      );
      //console.log('entities: ' + JSON.stringify(entities));
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromInvoices.LOAD_INVOICES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    /* case fromInvoices.UPDATE_INVOICE_SUCCESS:
    case fromInvoices.UPDATE_INVOICE_SUCCESS: {
      const invoice = action.payload;
      const entities = {
        ...state.entities,
        [invoice.id]: invoice
      };

      return {
        ...state,
        entities
      };
    } */

    case fromInvoices.REMOVE_INVOICE_SUCCESS: {
      const invoice = action.payload;
      const { [invoice.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getInvoicesEntities = (state: InvoiceState) => state.entities;
export const getInvoicesLoading = (state: InvoiceState) => state.loading;
export const getInvoicesLoaded = (state: InvoiceState) => state.loaded;
