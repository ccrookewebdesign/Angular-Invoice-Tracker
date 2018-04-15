import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import * as fromClientContainers from './containers';

import * as fromClientComponents from './components';

export const ROUTES: Routes = [
  {
    path: '',
    component:
      fromClientContainers.ClientsComponent /* ,
    data: { state: 'clients' } */
  },

  {
    path: 'new',
    component: fromClientContainers.ClientDetailComponent
  },
  {
    path: ':clientId',
    component: fromClientContainers.ClientDetailComponent
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
    ...fromClientContainers.containers,
    ...fromClientComponents.components
  ]
})
export class ClientsModule {}
