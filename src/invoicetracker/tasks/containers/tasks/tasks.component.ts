import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromTaskService from '../../../shared/services';

import { Tasks } from '../../../models/task.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'tasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tasks.component.scss'],
  template: `
  <div class="container">
    <div class="row" style="margin-bottom: 10px;">
      <div class="col-md-4 col-lg-4"><h1>Tasks</h1></div>
      <div class="col-md-8 col-lg-8 right">
        <div style="position: absolute; bottom: 8px; right: 20px;">
          <span><a [routerLink]="['/invoicetracker/tasks/', 'new']" class="clients-menu">Add New Task</a></span>
        </div>  
      </div>
    </div>

    <div class="row align-items-end" *ngIf="tasksCollection$ | async; let tasks;">
      <div *ngIf="!((tasks).length)">
          No tasks, add one to get started.
      </div>
      <div class="col-md-12 col-lg-12 client-padding">
        <mat-card><!--[ngClass]="animateOnRouteEnter"-->
          <tasks-table [tasks]="tasks"></tasks-table>
        </mat-card>  
      </div>    
    </div>
  </div>  
  `
})
export class TasksComponent implements OnInit {
  tasksCollection$: Observable<Tasks[]>;

  constructor(private taskService: fromTaskService.TasksService) {}

  ngOnInit() {
    this.tasksCollection$ = this.taskService.getTaskCollection();
  }
}
