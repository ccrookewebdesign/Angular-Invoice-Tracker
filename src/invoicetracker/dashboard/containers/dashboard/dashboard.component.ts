import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import * as fromDashboardService from '../../../services';

import { Invoice, Invoices } from '../../../models/invoice.model';
import { Task, Tasks } from '../../../models/task.model';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dashboard.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12"><h1>Dashboard</h1></div>
        <div class="col-md-6 col-lg-6" *ngIf="invoicesCollection$ | async; let invoices;">
          <mat-card [ngClass]="animateOnRouteEnter">
          <h4>Recent Invoices</h4>
          <div *ngIf="!invoices.length" class="norecords">
            No recent invoices for this client. <a [routerLink]="['/invoicetracker/invoices/new']">Add new invoice</a>
          </div>
          <invoices-table *ngIf="invoices.length" [showLinks]="false" [dateFormat]="'M/d/yy'" [invoices]="invoices.slice(0,6)" [fontSize]="'12px'"></invoices-table>
          <div class="right bottomlink">
            <a [routerLink]="['/invoicetracker/invoices']">view all invoices</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a [routerLink]="['/invoicetracker/invoices/new']">add new invoice</a>
          </div>
          </mat-card>
        </div>
        <div class="col-md-6 col-lg-6" *ngIf="tasksCollection$ | async; let tasks;">
          <mat-card [ngClass]="animateOnRouteEnter">
          <h4>Recent Tasks</h4>
          <div *ngIf="!tasks.length" class="norecords">
            No recent tasks for this client. <a [routerLink]="['/invoicetracker/tasks/new']">Add new task</a>
          </div>
          <tasks-table *ngIf="tasks.length" [dateFormat]="'M/d/yy'" [tasks]="tasks.slice(0,4)" [fontSize]="'12px'"></tasks-table>
          <div class="right bottomlink">
            <a [routerLink]="['/invoicetracker/tasks']">view all tasks</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a [routerLink]="['/invoicetracker/tasks/new']">add new task</a>
          </div>
          </mat-card>
        </div>
      </div> 
    </div>
  `
})
export class DashboardComponent implements OnInit {
  animateOnRouteEnter = 'route-enter-staggered';
  invoicesCollection$: Observable<Invoices[]>;
  tasksCollection$: Observable<Tasks[]>;

  constructor(
    private invoiceService: fromDashboardService.InvoicesService,
    private taskService: fromDashboardService.TasksService
  ) {}

  ngOnInit() {
    this.invoicesCollection$ = this.invoiceService.getInvoiceCollection();
    this.tasksCollection$ = this.taskService.getTaskCollection();
  }
}
