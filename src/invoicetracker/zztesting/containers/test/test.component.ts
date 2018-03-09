import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
//import { combineLatest } from 'rxjs/operators';
import 'rxjs/add/observable/combineLatest';
import * as fromStore from '../../../store';

import * as fromInvoiceService from '../../../services';

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
          <mat-card [ngClass]="animateOnRouteEnter">
          
          
          {{invoice$ | async | json}}

          </mat-card>
        </div>
      </div> 
    </div>
  `
})
export class TestComponent implements OnInit {
  animateOnRouteEnter = 'route-enter-staggered';

  invoice$: Observable<Invoice>;
  constructor(private invoiceService: fromInvoiceService.InvoicesService) {}

  ngOnInit() {
    this.invoice$ = this.invoiceService.getInvoice();
  }
}
