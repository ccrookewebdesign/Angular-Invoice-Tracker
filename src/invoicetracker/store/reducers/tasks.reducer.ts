import * as fromTasks from '../actions/tasks.action';
import { Task } from '../../models/task.model';

export interface TaskState {
  entities: { [id: string]: Task };
  loaded: boolean;
  loading: boolean;
}

export const initialState: TaskState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromTasks.TasksAction
): TaskState {
  switch (action.type) {
    case fromTasks.LOAD_TASKS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromTasks.LOAD_TASKS_SUCCESS: {
      const tasks = action.payload;
      //console.log('reducer: ' + JSON.stringify(tasks));
      const entities = tasks.reduce(
        (entities: { [id: string]: Task }, task: Task) => {
          return {
            ...entities,
            [task.id]: task
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
    case fromTasks.LOAD_TASKS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    /* case fromTasks.UPDATE_TASK_SUCCESS:
    case fromTasks.UPDATE_TASK_SUCCESS: {
      const task = action.payload;
      const entities = {
        ...state.entities,
        [task.id]: task
      };

      return {
        ...state,
        entities
      };
    } */

    case fromTasks.REMOVE_TASK_SUCCESS: {
      const task = action.payload;
      const { [task.id]: removed, ...entities } = state.entities;
      return {
        ...state,
        entities
      };
    }
  }

  return state;
}

export const getTasksEntities = (state: TaskState) => state.entities;
export const getTasksLoading = (state: TaskState) => state.loading;
export const getTasksLoaded = (state: TaskState) => state.loaded;
