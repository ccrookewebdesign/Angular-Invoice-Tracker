import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  FormBuilder,
  Validators
} from '@angular/forms';

import { map } from 'rxjs/operators';

import * as firebase from 'firebase';

import { Task } from '../../../models/task.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'task-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['task-form.component.scss'],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnChanges, OnInit {
  exists = false;
  defaultDate = firebase.firestore.FieldValue.serverTimestamp();
  mouseHover: boolean = false;

  @Input() task: Task;
  @Input() clients: Client[];
  @Input() selectedClient: Client;

  //@Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Task>();
  @Output() update = new EventEmitter<Task>();
  @Output() remove = new EventEmitter<Task>();
  @Output() cancel = new EventEmitter<any>();

  form = this.fb.group({
    clientId: [this.selectedClient, [Validators.required]],
    fixedRate: false,
    hourRate: [100, Validators.required],
    halfHourRate: [55, Validators.required],
    hours: [0, Validators.required],
    taskDate: [new Date().toISOString(), [Validators.required]], //, Validators.pattern('^(?:(?:10|12|0?[13578])/(?:3[01]|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|(?:11|0?[469])/(?:30|[12][0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/(?:2[0-8]|1[0-9]|0?[1-9])/(?:1[8-9]\\d{2}|[2-9]\\d{3})|0?2/29/[2468][048]00|0?2/29/[3579][26]00|0?2/29/[1][89][0][48]|0?2/29/[2-9][0-9][0][48]|0?2/29/1[89][2468][048]|0?2/29/[2-9][0-9][2468][048]|0?2/29/1[89][13579][26]|0?2/29/[2-9][0-9][13579][26])$')]
    taskDescription: ['', [Validators.required, Validators.maxLength(200)]],
    total: [0, Validators.required],
    invoiceId: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.selectedClient) {
      this.form.patchValue({ clientId: this.selectedClient.id });
    }
  }

  get taskDateControl() {
    return this.form.get('taskDate') as FormControl;
  }

  get clientIdControl() {
    return this.form.get('clientId') as FormControl;
  }

  get taskDescriptionControl() {
    return this.form.get('taskDescription') as FormControl;
  }

  get fixedRateControl() {
    return this.form.get('fixedRate') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.task && this.task.id) {
      this.exists = true;
      this.form.patchValue(this.task);
    }
  }

  createTask(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateTask(form: FormGroup) {
    const { value, valid, touched } = form;
    if (/* touched && */ valid) {
      this.update.emit({ ...this.task, ...value });
    }
  }

  removeTask(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.task, ...value });
  }

  cancelTask(form: FormGroup) {
    this.cancel.emit();
  }

  clientSelect() {
    let selectedClient = this.clients.find(
      i => i.id === this.form.value.clientId
    );
    this.form.patchValue({
      hourRate: selectedClient.hourRate,
      halfHourRate: selectedClient.halfHourRate,
      total: this.calcCost(selectedClient.hourRate, selectedClient.halfHourRate)
    });
  }

  updateRates() {
    //console.log('selectedClient: ' + this.selectedClient);
    this.form.patchValue({
      total: this.calcCost(
        this.form.value.hourRate,
        this.form.value.halfHourRate
      ),
      fixedRate: this.form.value.hours > 0 ? false : this.form.value.fixedRate
    });
  }

  setFixedRate() {
    if (this.form.value.fixedRate === true) {
      this.form.patchValue({ fixedRate: false });
    } else {
      this.form.patchValue({ hours: 0 });
      this.form.patchValue({ fixedRate: true });
    }
  }

  calcCost(hourRate: number, halfHourRate: number) {
    let theHours = this.form.value.hours;
    let quarterHourRate = 25;
    let thisTotal = 0;

    switch (theHours) {
      case 0.1: {
        thisTotal = 10;
        break;
      }
      case 0.25: {
        thisTotal = quarterHourRate;
        break;
      }
      case 0.5: {
        thisTotal = halfHourRate;
        break;
      }
      case 1: {
        thisTotal = hourRate;
        break;
      }
      case 1.25: {
        thisTotal = hourRate + quarterHourRate;
        break;
      }
      case 1.5: {
        thisTotal = hourRate + halfHourRate;
        break;
      }
      case 2: {
        thisTotal = hourRate * 2;
        break;
      }
      case 2.25: {
        thisTotal = hourRate * 2 + quarterHourRate;
        break;
      }
      case 2.5: {
        thisTotal = hourRate * 2 + halfHourRate;
        break;
      }
      case 3: {
        thisTotal = hourRate * 3;
        break;
      }
      case 3.25: {
        thisTotal = hourRate * 3 + quarterHourRate;
        break;
      }
      case 3.5: {
        thisTotal = hourRate * 3 + halfHourRate;
        break;
      }
      case 4: {
        thisTotal = hourRate * 4;
        break;
      }
      case 4.25: {
        thisTotal = hourRate * 4 + quarterHourRate;
        break;
      }
      case 4.5: {
        thisTotal = hourRate * 4 + halfHourRate;
        break;
      }
      case 5: {
        thisTotal = hourRate * 5;
        break;
      }
      case 5.25: {
        thisTotal = hourRate * 5 + quarterHourRate;
        break;
      }
      case 5.5: {
        thisTotal = hourRate * 5 + halfHourRate;
        break;
      }
      case 6: {
        thisTotal = hourRate * 6;
        break;
      }
      case 6.25: {
        thisTotal = hourRate * 6 + quarterHourRate;
        break;
      }
      case 6.5: {
        thisTotal = hourRate * 6 + halfHourRate;
        break;
      }
      case 7: {
        thisTotal = hourRate * 7;
        break;
      }
      case 7.25: {
        thisTotal = hourRate * 7 + quarterHourRate;
        break;
      }
      case 7.5: {
        thisTotal = hourRate * 7 + halfHourRate;
        break;
      }
      default: {
        break;
      }
    }

    return thisTotal;
  }
}
