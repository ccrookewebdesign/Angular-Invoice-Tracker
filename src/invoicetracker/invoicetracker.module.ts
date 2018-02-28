import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { SharedModule } from './shared/shared.module';

// components
import * as fromClientComponents from './clients/components';
import * as fromTaskComponents from './tasks/components';
import * as fromInvoiceComponents from './invoices/components';

// containers
import * as fromWrapperContainers from './wrapper';
import * as fromHomeContainers from './home';
import * as fromDashboardContainers from './dashboard/containers';
import * as fromClientContainers from './clients/containers';
import * as fromTaskContainers from './tasks/containers';
import * as fromInvoiceContainers from './invoices/containers';
import * as fromTestContainers from './zztesting/containers';

// guards
import * as fromGuards from './guards';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    component: fromWrapperContainers.WrapperComponent,
    children: [
      {
        path: '',
        component: fromHomeContainers.InvoiceTrackerHomeComponent
      },
      {
        path: 'dashboard',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard,
          fromGuards.TasksGuard
        ],
        component: fromDashboardContainers.DashboardComponent
      },
      {
        path: 'clients',
        canActivate: [fromGuards.AuthGuard, fromGuards.ClientsGuard],
        component: fromClientContainers.ClientsComponent
      },
      {
        path: 'clients/new',
        canActivate: [fromGuards.AuthGuard],
        component: fromClientContainers.ClientDetailComponent
      },
      {
        path: 'clients/:clientId',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard,
          fromGuards.TasksGuard
        ],
        component: fromClientContainers.ClientDetailComponent
      },
      {
        path: 'tasks',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.TasksGuard
        ],
        component: fromTaskContainers.TasksComponent
      },
      {
        path: 'tasks/client/:clientId',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.TasksGuard
        ],
        component: fromTaskContainers.TasksComponent
      },
      {
        path: 'tasks/new',
        canActivate: [fromGuards.AuthGuard, fromGuards.ClientsGuard],
        component: fromTaskContainers.TaskDetailComponent
      },
      {
        path: 'tasks/new/client/:clientId',
        canActivate: [fromGuards.AuthGuard, fromGuards.ClientsGuard],
        component: fromTaskContainers.TaskDetailComponent
      },
      {
        path: 'tasks/:taskId',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.TasksGuard
        ],
        component: fromTaskContainers.TaskDetailComponent
      },
      {
        path: 'invoices',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard
        ],
        component: fromInvoiceContainers.InvoicesComponent
      },
      {
        path: 'invoices/client/:clientId',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard
        ],
        component: fromInvoiceContainers.InvoicesComponent
      },
      {
        path: 'invoices/new',
        canActivate: [fromGuards.AuthGuard, fromGuards.ClientsGuard],
        component: fromInvoiceContainers.InvoiceDetailComponent
      },
      {
        path: 'invoices/new/client/:clientId',
        canActivate: [fromGuards.AuthGuard, fromGuards.ClientsGuard],
        component: fromInvoiceContainers.InvoiceDetailComponent
      },
      {
        path: 'invoices/:invoiceId',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard
        ],
        component: fromInvoiceContainers.InvoiceDetailComponent
      },
      {
        path: 'test',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard,
          fromGuards.TasksGuard
        ],
        component: fromTestContainers.TestComponent
      }
    ]
  },
  //{ path: '', redirectTo: 'invoicetracker', pathMatch: 'full' },
  { path: '**', component: fromHomeContainers.InvoiceTrackerHomeComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature('invoicetracker', reducers),
    EffectsModule.forFeature(effects),
    SharedModule
  ],
  providers: [...fromServices.services, ...fromGuards.guards],
  declarations: [
    ...fromClientContainers.containers,
    ...fromClientComponents.components,
    ...fromTaskContainers.containers,
    ...fromTaskComponents.components,
    ...fromInvoiceContainers.containers,
    ...fromInvoiceComponents.components,
    ...fromDashboardContainers.containers,
    ...fromHomeContainers.containers,
    ...fromWrapperContainers.containers,
    ...fromTestContainers.containers
  ],
  exports: [
    ...fromClientContainers.containers,
    ...fromClientComponents.components,
    ...fromTaskContainers.containers,
    ...fromTaskComponents.components,
    ...fromInvoiceContainers.containers,
    ...fromInvoiceComponents.components,
    ...fromDashboardContainers.containers,
    ...fromHomeContainers.containers,
    ...fromWrapperContainers.containers,
    ...fromTestContainers.containers
  ]
})
export class InvoiceTrackerModule {}
