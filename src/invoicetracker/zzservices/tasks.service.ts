import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import 'rxjs/add/observable/throw';

import * as fromStore from '../store';

import {
  AngularFirestore,
  AngularFirestoreCollection
} from 'angularfire2/firestore';

import { Task, Tasks, TasksCollection } from '../models/task.model';
import { Client } from '../models/client.model';

@Injectable()
export class TasksService {
  constructor(
    private afs: AngularFirestore,
    private store: Store<fromStore.InvoiceTrackerState>
  ) {}

  getTasks(): Observable<Task[]> {
    const ref = this.afs.collection<Task>('tasks', ref =>
      ref.orderBy('taskDate', 'desc')
    );

    return ref.snapshotChanges().map(arr => {
      return arr.map(doc => {
        const data = doc.payload.doc.data();
        data.id = doc.payload.doc.id;
        return { id: doc.payload.doc.id, ...data } as Task;
      });
    });
  }

  createTask(payload: Task): Observable<Task> {
    const ref = this.afs.collection('tasks').add(payload);

    return Observable.of<Task>(payload);
  }

  updateTask(payload: Task): Observable<Task> {
    const ref = this.afs.doc<Task>(`tasks/${payload.id}`).update(payload);
    return Observable.of<Task>(payload);
  }

  removeTask(payload: Task): Observable<Task> {
    const ref = this.afs.doc<Task>(`tasks/${payload.id}`).ref.delete();
    return Observable.of<Task>(payload);
  }

  tasksCollection: TasksCollection = {
    sumHours: 0,
    sumTotal: 0,
    tasks: []
  };

  calcTask(task: any) {
    this.tasksCollection.sumHours += +task.hours;
    this.tasksCollection.sumTotal += +task.total;
    this.tasksCollection.tasks.push(task);
    /* console.log('sumHours: ' + this.tasksCollection.sumHours);
    console.log('sumTotal: ' + this.tasksCollection.sumTotal);
    console.log('tasks: ' + this.tasksCollection.tasks); */
    //console.log('tasks: ' + JSON.stringify(this.tasks));
    //return {tasks: this.tasksCollection.tasks, sumHours: this.tasksCollection.sumHours, sumTotal: this.tasksCollection.sumTotal,};
    return task;
  }

  getTaskCollection(): Observable<Tasks[]> {
    this.tasksCollection.sumHours = 0;
    this.tasksCollection.sumTotal = 0;
    this.tasksCollection.tasks = [];

    let tasksCollection$: Observable<Tasks[]>;

    return (tasksCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllTasks),
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getSelectedClient),
      (tasks: any[], clients: any[], selectedClient: any) => {
        return tasks
          .map(task => {
            let taskClient: Client = clients.find(
              client => client.id === task.clientId
            ) || {
              client: {}
            };

            return {
              ...task,
              client: taskClient
            };
          })
          .filter(
            task =>
              task.clientId ===
              (selectedClient ? selectedClient.id : task.clientId)
          )
          .map(task => this.calcTask(task));
      }
    ));
  }

  /* calcTaskTest(task: any) {
    this.tasksCollection.sumHours += +task.hours;
    this.tasksCollection.sumTotal += +task.total;
    this.tasksCollection.tasks.push(task);
    return task;
  } */

  /* getTaskCollectionTest(): Observable<TasksCollection> {
    this.tasksCollection.sumHours = 0;
    this.tasksCollection.sumTotal = 0;
    this.tasksCollection.tasks = [];

    let tasksCollection$: Observable<TasksCollection>;

    (tasksCollection$ = Observable.combineLatest(
      this.store.select(fromStore.getAllTasks),
      this.store.select(fromStore.getAllClients),
      this.store.select(fromStore.getSelectedClient),
      (tasks: any[], clients: any[], selectedClient: any) => {
        return tasks
          .map(task => {
            let taskClient: Client = clients.find(
              client => client.id === task.clientId
            ) || {
              client: {}
            };

            return {
              ...task,
              client: taskClient
            };
          })
          .filter(
            task =>
              task.clientId ===
              (selectedClient ? selectedClient.id : task.clientId)
          )
          .map(task => this.calcTaskTest(task));
      }
    ));  
    
  } */
}
