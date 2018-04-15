import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import { DashboardComponent } from './containers/dashboard/dashboard.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent /* ,
    data: { state: 'dashboard' } */
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    SharedModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
