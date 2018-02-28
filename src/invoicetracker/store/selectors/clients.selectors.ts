import { getAllTasks } from './tasks.selectors';
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromClients from '../reducers/clients.reducer';
import * as fromTasks from '../reducers/tasks.reducer';

import { Client } from '../../models/client.model';
import { Task } from '../../models/task.model';

export const getClientState = createSelector(
  fromFeature.getInvoiceTrackerState,
  (state: fromFeature.InvoiceTrackerState) => state.clients
);

export const getClientsEntities = createSelector(
  getClientState,
  fromClients.getClientsEntities
);

export const getSelectedClient = createSelector(
  getClientsEntities,
  fromRoot.getRouterState,
  (entities, router): Client => {
    return router.state && entities[router.state.params.clientId];
  }
);

export const getAllClients = createSelector(getClientsEntities, entities => {
  return Object.keys(entities).map(id => entities[id]);
});

export const getActiveClients = createSelector(getClientsEntities, entities => {
  return Object.keys(entities)
    .map(id => entities[id])
    .filter(client => client.active);
});

export const getClientsLoading = createSelector(
  getClientState,
  fromClients.getClientsLoading
);
export const getClientsLoaded = createSelector(
  getClientState,
  fromClients.getClientsLoaded
);
export const getShowArchived = createSelector(
  getClientState,
  fromClients.getShowArchived
);
