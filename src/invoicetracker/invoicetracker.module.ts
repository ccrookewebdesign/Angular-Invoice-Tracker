import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

import { SharedModule } from './shared/shared.module';

import * as fromWrapperContainers from './wrapper';
import * as fromHomeContainers from './home';

import * as fromGuards from './guards';

export const ROUTES: Routes = [
  {
    path: '',
    component: fromWrapperContainers.WrapperComponent,
    children: [
      {
        path: '',
        component:
          fromHomeContainers.InvoiceTrackerHomeComponent /* ,
        data: { state: 'invoicetracker' } */
      },
      {
        path: 'dashboard',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard,
          fromGuards.TasksGuard
        ],
        loadChildren: './dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'clients',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard
        ],
        loadChildren: './clients/clients.module#ClientsModule'
      },
      {
        path: 'tasks',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.TasksGuard
        ],
        loadChildren: './tasks/tasks.module#TasksModule'
      },
      {
        path: 'invoices',
        canActivate: [
          fromGuards.AuthGuard,
          fromGuards.ClientsGuard,
          fromGuards.InvoicesGuard,
          fromGuards.TasksGuard
        ],
        loadChildren: './invoices/invoices.module#InvoicesModule'
      }
    ]
  },
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
    SharedModule.forRoot()
  ],
  providers: [...fromGuards.guards],
  declarations: [
    ...fromHomeContainers.containers,
    ...fromWrapperContainers.containers
  ],
  exports: [
    ...fromHomeContainers.containers,
    ...fromWrapperContainers.containers
  ]
})
export class InvoiceTrackerModule {}
