import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Tasks } from '../../../models/task.model';
//import { Client } from '../../../models/client.model';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'tasks-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['tasks-table.component.scss'],
  template: `
    <table [ngStyle]="{'font-size': fontSize}" class="taskstable" *ngIf="tasks; let tasks; else loading">
    <tr class="headerrow">
      <td class="pl15"><span class="mousepointer">Date</span></td>
      <td *ngIf="clientId === null">Client</td>
      <td>Task</td>
      <td class="right">Hours</td>
      <td class="right">Total</td>
    </tr>
    <tbody>
    <tr *ngIf="tasks.length === 0" class="fs12">
      <td colspan="5" class="pt25 strong em pb25">
        No tasks for this criteria. <a [routerLink]="['/invoicetracker/tasks/new']">Add new task</a>.
      </td>
    </tr>
    <tr [ngClass]="animateOnRouteEnter" *ngFor="let task of tasks">
      {{calcTotal(task.hours, task.total)}}
      <td scope="row" class="pl15">
        <a [routerLink]="['/invoicetracker/tasks', task.id]">{{task.taskDate | date: dateFormat}}</a>
      </td>
      <td *ngIf="clientId === null"><a [routerLink]="['/invoicetracker/clients', task.clientId]">{{task.client.clientName}}</a></td>
      <td>{{task.taskDescription}}</td>
      <td class="right">{{task.hours | number}}</td>
      <td class="right">{{task.total | number}}</td>
    </tr>
    <tr [ngClass]="animateOnRouteEnter" class="nohover" *ngIf="tasks.length !== 0">
      <td *ngIf="clientId !== null" scope="row"  class="pl15 strong" colspan="2">
        <a class="fs13" [routerLink]="['/invoicetracker/tasks/client', clientId]">view all tasks</a>&nbsp;&nbsp;|&nbsp;&nbsp;
        <a class="fs13" [routerLink]="['/invoicetracker/tasks/new/client', clientId]">add new task</a>
      </td>  
      <td *ngIf="clientId === null" colspan="3">&nbsp;</td>
      <td class="right strong table-totals">{{sumHours | number}}</td>
      <td class="right strong table-totals">{{sumTotal | number}}</td>
    </tr>
    </tbody>
    </table>
    <ng-template #loading>Loading&hellip;</ng-template>
  `
})
export class TasksTableComponent {
  animateOnRouteEnter = 'route-enter-staggered';
  @Input() tasks: Tasks[];
  @Input() clientId: string = null;
  @Input() fontSize: string = '14px';
  @Input() dateFormat: string = 'MM/dd/yyyy';

  sumHours: number = 0;
  sumTotal: number = 0;

  calcTotal(hours: number, total: number) {
    this.sumHours += +hours;
    this.sumTotal += +total;
    //console.log(this.sumTotal);
  }
}
