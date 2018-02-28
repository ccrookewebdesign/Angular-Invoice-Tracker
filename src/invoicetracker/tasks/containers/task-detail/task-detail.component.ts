import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../app/store';
import * as fromStore from '../../../store';

import * as firebase from 'firebase';

import { Task } from '../../../models/task.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'task-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-detail.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12">
          <h1>Task Detail</h1>          
        </div>
      </div>
      <div class="row">
        <div class="col-md-7 col-lg-7">
          <task-form
            [task]="task$ | async"
            [clients]="clients$ | async"
            [selectedClient]="selectedClient$ | async"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)"
            (cancel)="onCancel($event)">        
          </task-form>
        </div>
      </div>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  task$: Observable<Task>;
  clients$: Observable<Client[]>;
  selectedClient$: Observable<Client>;

  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  ngOnInit() {
    this.task$ = this.store.select(fromStore.getSelectedTask);
    this.clients$ = this.store.select(fromStore.getActiveClients);
    this.selectedClient$ = this.store.select(fromStore.getSelectedClient);
  }

  onCreate(event: Task) {
    event.createDate = firebase.firestore.FieldValue.serverTimestamp();
    this.store.dispatch(new fromStore.CreateTask(event));
  }

  onUpdate(event: Task) {
    this.store.dispatch(new fromStore.UpdateTask(event));
  }

  onRemove(event: Task) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveTask(event));
    }
  }

  onCancel(event: Task) {
    this.store.dispatch(new fromRoot.Back());
  }
}
