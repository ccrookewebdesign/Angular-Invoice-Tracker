import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import { combineLatest } from 'rxjs/operators';
import 'rxjs/add/observable/combineLatest';
import * as fromStore from '../../../store';

import { Client } from '../../../models/client.model';
import { Task, Tasks } from '../../../models/task.model';
import { Invoice, Invoices } from '../../../models/invoice.model';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'test',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['test.component.scss'],
  template: `
    <div class="container">
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12"><h1>Scratchpad</h1></div>
        <div class="col-md-12 col-lg-12" >
          <!--
          <mat-card [ngClass]="animateOnRouteEnter" *ngFor="let task of tasksCollection$ | async">
          {{task | json}}
          </mat-card>
          -->
          <mat-card [ngClass]="animateOnRouteEnter" *ngFor="let invoice of invoicesCollection$ | async">
          <a [routerLink]="['/invoicetracker/invoices/', 'QupZWPExKuOWXKtsDSS3']">Invoice</a>
          
          {{invoice | json}}

          </mat-card>
        </div>
      </div> 
    </div>
  `
})
export class TestComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  clients$: Observable<Client[]>;
  tasks$: Observable<Task[]>;
  tasksCollection$: Observable<Tasks[]>;
  invoicesCollection$: Observable<Invoices[]>;
  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  ngOnInit() {
    this.clients$ = this.store.select(fromStore.getAllClients);
    this.tasks$ = this.store.select(fromStore.getAllTasks);
    //this.tasksCollection$ = this.getTasks();
    this.invoicesCollection$ = this.getTasks();
  }

  getTasks(): Observable<Invoices[]> {
    /* return (this.tasksCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllTasks),
      this.store.select(fromStore.getAllClients),
      (tasks: any[], clients: any[]) => {
        return tasks.map(task => {
          var taskClient: Client = clients.find(
            client => client.id === task.clientId
          ) || {
            client: {}
          };
          return Object.assign({}, task, { client: taskClient });
        });
      }
    )); */

    return (this.invoicesCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllInvoices),
      this.store.select(fromStore.getAllClients),
      //this.store.select(fromStore.getSelectedClient),
      (invoices: any[], clients: any[] /* , selectedClient: any */) => {
        return invoices
          .map(invoice => {
            let invoiceClient: Client = clients.find(
              client => client.id === invoice.clientId
            ) || {
              client: {}
            };
            return Object.assign({}, invoice, { client: invoiceClient });
          })
          .map(invoices => {
            let sumTotal = invoices.reduce(
              (a: any, b: Invoice) => a + b.invoiceTotal,
              0
            );
            return Object.assign({}, invoices, { sumTotal: sumTotal });
          });
      }
    ));
  }
}
