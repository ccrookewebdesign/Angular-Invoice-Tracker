import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromTaskService from '../../../services';

import { Tasks } from '../../../models/task.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'tasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tasks.component.scss'],
  template: `
  <div class="container">
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-12 col-lg-12"><h1>Tasks</h1></div>
    </div>  
    
    <div class="row align-items-end" *ngIf="tasksCollection$ | async; let tasks; else loading">
      <div *ngIf="!((tasks).length)">
          No tasks, add one to get started.
      </div>
      <div class="col-md-12 col-lg-12 client-padding">
        <!-- [client]="client" -->
        <mat-card [ngClass]="animateOnRouteEnter">
          <tasks-table [tasks]="tasks"></tasks-table>
        </mat-card>  
      </div>    
    </div>
    <ng-template #loading>Loading&hellip;</ng-template>
  </div>  
  `
})
export class TasksComponent implements OnInit {
  tasksCollection$: Observable<Tasks[]>;
  //client$: Observable<Client>;

  constructor(private taskService: fromTaskService.TasksService) {}

  ngOnInit() {
    this.tasksCollection$ = this.taskService.getTaskCollection();
  }
}
