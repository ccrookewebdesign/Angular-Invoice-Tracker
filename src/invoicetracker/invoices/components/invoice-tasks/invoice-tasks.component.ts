import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { Tasks } from '../../../models/task.model';

@Component({
  selector: 'invoice-tasks',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['invoice-tasks.component.scss'],
  template: `
    <div>
      <mat-card> 
      <h4>Invoice Tasks</h4>
      <table [ngStyle]="{'font-size': fontSize}" class="taskstable" 
      *ngIf="tasks; let tasks; else loading">
    <tr class="headerrow">
      <td class="pl15"><span class="mousepointer">Date</span></td>
      <td *ngIf="clientId === null">Client</td>
      <td>Task</td>
      <td class="right mobileHide">Hours</td>
      <td class="right">Total</td>
    </tr>
    <tbody>
    <tr *ngIf="tasks.length === 0" class="fs12">
      <td colspan="5" class="pt25 strong em pb25">
        No tasks for this criteria. <a [routerLink]="['/invoicetracker/tasks/new']">Add new task</a>.
      </td>
    </tr>
    <tr [ngClass]="animateOnRouteEnter" *ngFor="let task of tasks">
      <td scope="row" class="pl15 mobileSmall">
        <a [routerLink]="['/invoicetracker/tasks', task.id]">{{task.taskDate | date: dateFormat}}</a>
      </td>
      <td *ngIf="clientId === null"><a [routerLink]="['/invoicetracker/clients', task.clientId]">{{task.client.clientName}}</a></td>
      <td class="mobileSmall">{{task.taskDescription}}</td>
      <td class="right mobileHide">{{task.hours | number}}</td>
      <td class="right">{{task.total | number}}</td>
    </tr>
    <tr [ngClass]="animateOnRouteEnter" class="nohover" *ngIf="tasks.length !== 0">
      <td *ngIf="clientId === null" colspan="3">&nbsp;</td>
      <td *ngIf="clientId !== null" colspan="2">&nbsp;</td>
      <td class="right mobileHide strong table-totals">{{taskTotals.sumHours | number}}</td>
      <td class="right strong table-totals">{{taskTotals.sumTotal | number}}</td>
    </tr>
    </tbody>
    </table>
    <ng-template #loading><p>Heh... still working on this part&hellip;</p></ng-template>
      </mat-card>
    </div>
  `
})
export class InvoiceTasksComponent {
  animateOnRouteEnter = 'route-enter-staggered';
  taskTotals: { sumHours: number; sumTotal: number };

  @Input() tasks: Tasks[];
  @Input() clientId: string = null;
  @Input() fontSize: string = '';
  @Input() dateFormat: string = 'MM/dd/yyyy';

  ngOnInit() {
    this.taskTotals = this.calcTotal(this.tasks);
  }

  calcTotal(tasks: Tasks[]) {
    let tempHours = 0;
    let tempTotal = 0;
    if (this.tasks) {
      for (let task of this.tasks) {
        tempHours += +task.hours;
        tempTotal += +task.total;
      }
    }

    return { sumHours: tempHours, sumTotal: tempTotal };
  }
}
