import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromTasks from '../reducers/tasks.reducer';

import { Task } from '../../models/task.model';

export const getTaskState = createSelector(
  fromFeature.getInvoiceTrackerState,
  (state: fromFeature.InvoiceTrackerState) => state.tasks
);

export const getTasksEntities = createSelector(
  getTaskState,
  fromTasks.getTasksEntities
);

export const getSelectedTask = createSelector(
  getTasksEntities,
  fromRoot.getRouterState,
  (entities, router): Task => {
    return router.state && entities[router.state.params.taskId];
  }
);

export const getAllTasks = createSelector(getTasksEntities, entities => {
  //return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  return Object.keys(entities).map(id => entities[id]);
});
export const getTasksLoading = createSelector(
  getTaskState,
  fromTasks.getTasksLoading
);
export const getTasksLoaded = createSelector(
  getTaskState,
  fromTasks.getTasksLoaded
);

export const getClientTasks = createSelector(
  getTasksEntities,
  fromRoot.getRouterState,
  (entities, router): Task[] => {
    return Object.keys(entities)
      .map(id => entities[id])
      .filter(task => task.clientId == router.state.params.clientId);
  }
);
