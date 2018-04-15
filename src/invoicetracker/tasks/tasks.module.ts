import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './../shared/shared.module';

import * as fromTaskContainers from './containers';

import * as fromTaskComponents from './components';

export const ROUTES: Routes = [
  {
    path: '',
    component:
      fromTaskContainers.TasksComponent /* ,
    data: { state: 'tasks' } */
  },
  {
    path: 'client/:clientId',
    component: fromTaskContainers.TasksComponent
  },
  {
    path: 'new',
    component: fromTaskContainers.TaskDetailComponent
  },
  {
    path: 'new/client/:clientId',
    component: fromTaskContainers.TaskDetailComponent
  },
  {
    path: ':taskId',
    component: fromTaskContainers.TaskDetailComponent
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
    ...fromTaskContainers.containers,
    ...fromTaskComponents.components
  ]
})
export class TasksModule {}
