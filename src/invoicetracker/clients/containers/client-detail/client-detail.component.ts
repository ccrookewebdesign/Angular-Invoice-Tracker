import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../../../app/store';
import * as fromStore from '../../../store';

import * as firebase from 'firebase';

import * as fromTaskService from '../../../services';

import { Client } from '../../../models/client.model';
import { Invoices } from '../../../models/invoice.model';
import { Tasks } from '../../../models/task.model';

@Component({
  selector: 'client-detail',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./client-detail.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12">
          <h1>Client Detail</h1>          
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-lg-7">
          <client-form
            [client]="client$ | async"
            (create)="onCreate($event)"
            (update)="onUpdate($event)"
            (remove)="onRemove($event)"
            (cancel)="onCancel($event)">
          </client-form>
        </div>
        <div class="col-md-12 col-lg-5" *ngIf="client$ | async; let client;">
          <div class="row align-items-end" *ngIf="clientInvoices$ | async; let invoices;">
            <div class="col-md-12 col-lg-12 client-padding">
            <mat-card [ngClass]="animateOnRouteEnter">
              <h4>Recent Invoices</h4>
              <div *ngIf="!invoices.length" class="norecords">
                No recent invoices for this client. <a [routerLink]="['/invoicetracker/invoices/new/client', client.id]">Add new invoice</a>
              </div>
              <invoices-table *ngIf="invoices.length" [clientId]="client.id" [invoices]="invoices.slice(0,displayInvoiceCount)" [fontSize]="'12px'"></invoices-table>        
              <div class="right bottomlink fs12">
                <a [routerLink]="['/invoicetracker/invoices/client/', client.id]">view all invoices</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a [routerLink]="['/invoicetracker/invoices/new/client', client.id]">add new invoice</a>
              </div>
            </mat-card>
            </div>    
          </div>
                  
          <div class="row align-items-end" *ngIf="clientTasks$ | async; let tasks;">
            <div class="col-md-12 col-lg-12 client-padding">
            <mat-card [ngClass]="animateOnRouteEnter">
              <h4>Recent Tasks</h4>
              <div *ngIf="!tasks.length" class="norecords">
                No recent tasks for this client. <a [routerLink]="['/invoicetracker/tasks/new/client', client.id]">Add new task</a>
              </div>
              <tasks-table *ngIf="tasks.length" [clientId]="client.id" [tasks]="tasks.slice(0,displayTaskCount)" [fontSize]="'12px'"></tasks-table>        
              <div class="right bottomlink fs12">
                <a [routerLink]="['/invoicetracker/tasks/client/', client.id]">view all tasks</a>&nbsp;&nbsp;|&nbsp;&nbsp;
                <a [routerLink]="['/invoicetracker/tasks/new/client', client.id]">add new task</a>
              </div>
            </mat-card>
            </div>    
          </div>
        </div>
      </div>
    </div>
  `
})
export class ClientDetailComponent implements OnInit {
  client$: Observable<Client>;
  clientInvoices$: Observable<Invoices[]>;
  clientTasks$: Observable<Tasks[]>;
  displayTaskCount: number = 4;
  displayInvoiceCount: number = 3;

  constructor(
    private store: Store<fromStore.InvoiceTrackerState>,
    private invoiceService: fromTaskService.InvoicesService,
    private taskService: fromTaskService.TasksService
  ) {}

  ngOnInit() {
    this.client$ = this.store.select(fromStore.getSelectedClient);
    this.clientInvoices$ = this.invoiceService.getInvoiceCollection();
    this.clientTasks$ = this.taskService.getTaskCollection();
  }

  onCreate(event: Client) {
    event.createDate = firebase.firestore.FieldValue.serverTimestamp();
    this.store.dispatch(new fromStore.CreateClient(event));
  }

  onUpdate(event: Client) {
    this.store.dispatch(new fromStore.UpdateClient(event));
  }

  onRemove(event: Client) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.RemoveClient(event));
    }
  }

  onCancel(event: Client) {
    this.store.dispatch(new fromRoot.Back());
  }
}
