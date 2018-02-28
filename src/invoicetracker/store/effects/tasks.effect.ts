import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromRoot from '../../../app/store';
import * as taskActions from '../actions/tasks.action';
import * as fromServices from '../../services';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private taskService: fromServices.TasksService
  ) {}

  @Effect()
  loadTasks$ = this.actions$.ofType(taskActions.LOAD_TASKS).pipe(
    switchMap(() => {
      return this.taskService.getTasks().pipe(
        /*  map(tasks => {
          console.log(tasks);
        }), */
        map(tasks => new taskActions.LoadTasksSuccess(tasks)),
        catchError(error => of(new taskActions.LoadTasksFail(error)))
      );
    })
  );

  @Effect()
  createTask$ = this.actions$.ofType(taskActions.CREATE_TASK).pipe(
    map((action: taskActions.CreateTask) => action.payload),
    switchMap(task => {
      return this.taskService
        .createTask(task)
        .pipe(
          map(task => new taskActions.CreateTaskSuccess(task)),
          catchError(error => of(new taskActions.CreateTaskFail(error)))
        );
    })
  );

  @Effect()
  createTaskSuccess$ = this.actions$
    .ofType(taskActions.CREATE_TASK_SUCCESS)
    .pipe(
      map((action: taskActions.CreateTaskSuccess) => action.payload),
      map(
        task =>
          new fromRoot.Go({
            path: ['/invoicetracker/tasks']
          })
      )
    );

  @Effect()
  updateTask$ = this.actions$.ofType(taskActions.UPDATE_TASK).pipe(
    map((action: taskActions.UpdateTask) => action.payload),
    switchMap(task => {
      return this.taskService
        .updateTask(task)
        .pipe(
          map(task => new taskActions.UpdateTaskSuccess(task)),
          catchError(error => of(new taskActions.UpdateTaskFail(error)))
        );
    })
  );

  @Effect()
  removeTask$ = this.actions$.ofType(taskActions.REMOVE_TASK).pipe(
    map((action: taskActions.RemoveTask) => action.payload),
    switchMap(task => {
      return this.taskService
        .removeTask(task)
        .pipe(
          map(() => new taskActions.RemoveTaskSuccess(task)),
          catchError(error => of(new taskActions.RemoveTaskFail(error)))
        );
    })
  );

  @Effect()
  handleTaskSuccess = this.actions$
    .ofType(taskActions.UPDATE_TASK_SUCCESS, taskActions.REMOVE_TASK_SUCCESS)
    .pipe(
      map(task => {
        return new fromRoot.Go({
          path: ['/invoicetracker/tasks']
        });
      })
    );
}
