import { Action } from '@ngrx/store';

import { Task } from '../../models/task.model';

export const LOAD_TASKS = '[Tasks] Load Tasks';
export const LOAD_TASKS_FAIL = '[Tasks] Load Tasks Fail';
export const LOAD_TASKS_SUCCESS = '[Tasks] Load Tasks Success';

export class LoadTasks implements Action {
  readonly type = LOAD_TASKS;
}

export class LoadTasksFail implements Action {
  readonly type = LOAD_TASKS_FAIL;
  constructor(public payload: any) {}
}

export class LoadTasksSuccess implements Action {
  readonly type = LOAD_TASKS_SUCCESS;
  constructor(public payload: Task[]) {}
}

export const CREATE_TASK = '[Tasks] Create Task';
export const CREATE_TASK_FAIL = '[Tasks] Create Task Fail';
export const CREATE_TASK_SUCCESS = '[Tasks] Create Task Success';

export class CreateTask implements Action {
  readonly type = CREATE_TASK;
  constructor(public payload: Task) {}
}

export class CreateTaskFail implements Action {
  readonly type = CREATE_TASK_FAIL;
  constructor(public payload: any) {}
}

export class CreateTaskSuccess implements Action {
  readonly type = CREATE_TASK_SUCCESS;
  constructor(public payload: Task) {}
}

export const UPDATE_TASK = '[Tasks] Update Task';
export const UPDATE_TASK_FAIL = '[Tasks] Update Task Fail';
export const UPDATE_TASK_SUCCESS = '[Tasks] Update Task Success';

export class UpdateTask implements Action {
  readonly type = UPDATE_TASK;
  constructor(public payload: Task) {}
}

export class UpdateTaskFail implements Action {
  readonly type = UPDATE_TASK_FAIL;
  constructor(public payload: any) {}
}

export class UpdateTaskSuccess implements Action {
  readonly type = UPDATE_TASK_SUCCESS;
  constructor(public payload: Task) {}
}

export const REMOVE_TASK = '[Tasks] Remove Task';
export const REMOVE_TASK_FAIL = '[Tasks] Remove Task Fail';
export const REMOVE_TASK_SUCCESS = '[Tasks] Remove Task Success';

export class RemoveTask implements Action {
  readonly type = REMOVE_TASK;
  constructor(public payload: Task) {}
}

export class RemoveTaskFail implements Action {
  readonly type = REMOVE_TASK_FAIL;
  constructor(public payload: any) {}
}

export class RemoveTaskSuccess implements Action {
  readonly type = REMOVE_TASK_SUCCESS;
  constructor(public payload: Task) {}
}

export type TasksAction =
  | LoadTasks
  | LoadTasksFail
  | LoadTasksSuccess
  | CreateTask
  | CreateTaskFail
  | CreateTaskSuccess
  | UpdateTask
  | UpdateTaskFail
  | UpdateTaskSuccess
  | RemoveTask
  | RemoveTaskFail
  | RemoveTaskSuccess;
