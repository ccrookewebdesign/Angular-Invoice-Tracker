import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import * as fromInvoiceContainers from './containers';

import * as fromInvoiceComponents from './components';

export const ROUTES: Routes = [
  {
    path: '',
    component: fromInvoiceContainers.InvoicesComponent,
    data: { state: 'invoices' }
  },
  {
    path: 'client/:clientId',
    component: fromInvoiceContainers.InvoicesComponent
  },
  {
    path: 'new',
    component: fromInvoiceContainers.InvoiceDetailComponent
  },
  {
    path: 'new/client/:clientId',
    component: fromInvoiceContainers.InvoiceDetailComponent
  },
  {
    path: ':invoiceId',
    component: fromInvoiceContainers.InvoiceDetailComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [
    ...fromInvoiceContainers.containers,
    ...fromInvoiceComponents.components
  ]
})
export class InvoicesModule {}
