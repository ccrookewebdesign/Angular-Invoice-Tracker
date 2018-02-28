import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';
import * as fromStore from '../../../store';

import { Client } from '../../../models/client.model';

import { ANIMATE_ON_ROUTE_ENTER } from '../../../shared/animations/router.transition';

@Component({
  selector: 'clients',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['clients.component.scss'],
  template: `
    <div class="container">
      <!--<div class="row" style="margin-bottom: 10px;">
        <div class="col-md-12 col-lg-12"><h1>Clients</h1></div>
      </div>-->  
      <div class="row" style="margin-bottom: 10px;">
        <div class="col-md-4 col-lg-4"><h1>Clients</h1></div>
        <div class="col-md-8 col-lg-8 right">
          <div style="position: absolute; bottom: 5px; right: 20px;">
            <client-filter (toggle)="updateFilter($event)" [showArchived]="showArchived$ | async"></client-filter>
            <span><a [routerLink]="['/invoicetracker/clients/', 'new']" class="clients-menu">Add New Client</a></span>
          </div>  
        </div>
      </div>
      <div class="row align-items-end" *ngIf="clients$ | async; let clients; else loading">
        <div *ngIf="!((clients).length)">
            No clients, add one to get started.
        </div>
        
        <div [ngClass]="animateOnRouteEnter" *ngFor="let client of clients"  class="col-md-6 col-lg-6">
          <client-item [client]="client"></client-item>        
        </div>    
      </div>
      <ng-template #loading>Loading&hellip;</ng-template>
    </div>  
  `
})
export class ClientsComponent implements OnInit {
  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  showArchived$: Observable<boolean>;
  clients$: Observable<Client[]>;

  constructor(private store: Store<fromStore.InvoiceTrackerState>) {}

  ngOnInit() {
    //this.clients$ = this.store.select(fromStore.getActiveClients);
    this.showArchived$ = this.store.select(fromStore.getShowArchived).pipe(
      map(showArchived => {
        if (showArchived) {
          this.clients$ = this.store.select(fromStore.getAllClients);
        } else {
          this.clients$ = this.store.select(fromStore.getActiveClients);
        }
        //console.log(showArchived);
        return showArchived;
      })
    );
  }

  updateFilter(event: boolean) {
    this.store.dispatch(new fromStore.ToggleShowArchived(event));
  }
}
