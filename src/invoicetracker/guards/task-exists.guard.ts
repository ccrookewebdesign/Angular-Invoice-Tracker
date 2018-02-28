import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import * as fromStore from '../store';

import { Task } from '../models/task.model';

@Injectable()
export class TaskExistsGuard implements CanActivate {
  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = route.params.taskId;
        return this.hasTask(id);
      })
    );
  }

  hasTask(id: string): Observable<boolean> {
    return this.store
      .select(fromStore.getTasksEntities)
      .pipe(
        map((entities: { [key: string]: Task }) => !!entities[id]),
        take(1)
      );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromStore.getTasksLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromStore.LoadTasks());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
