import * as fromClients from '../actions/clients.action';
import { Client } from '../../models/client.model';

export interface ClientState {
  entities: { [id: string]: Client };
  loaded: boolean;
  loading: boolean;
  showArchived: boolean;
}

export const initialState: ClientState = {
  entities: {},
  loaded: false,
  loading: false,
  showArchived: false
};

export function reducer(
  state = initialState,
  action: fromClients.ClientsAction
): ClientState {
  switch (action.type) {
    case fromClients.LOAD_CLIENTS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromClients.LOAD_CLIENTS_SUCCESS: {
      const clients = action.payload;
      //console.log('reducer: ' + JSON.stringify(clients));
      const entities = clients.reduce(
        (entities: { [id: string]: Client }, client: Client) => {
          return {
            ...entities,
            [client.id]: client
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
    case fromClients.LOAD_CLIENTS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromClients.TOGGLE_SHOW_ARCHIVED: {
      const showArchived = action.payload;
      return {
        ...state,
        showArchived
      };
    }

    /* 
    case fromClients.UPDATE_CLIENT_SUCCESS:
    case fromClients.UPDATE_CLIENT_SUCCESS: {
      const client = action.payload;
      const entities = {
        ...state.entities,
        [client.id]: client
      };

      return {
        ...state,
        entities
      };
    }
    */

    case fromClients.REMOVE_CLIENT_SUCCESS: {
      const client = action.payload;
      const { [client.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getClientsEntities = (state: ClientState) => state.entities;
export const getClientsLoading = (state: ClientState) => state.loading;
export const getClientsLoaded = (state: ClientState) => state.loaded;
export const getShowArchived = (state: ClientState) => state.showArchived;
