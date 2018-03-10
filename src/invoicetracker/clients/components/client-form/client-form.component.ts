import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
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

import { Client } from '../../../models/client.model';

@Component({
  selector: 'client-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./client-form.component.scss'],
  templateUrl: './client-form.component.html'
})
export class ClientFormComponent implements OnChanges {
  exists = false;

  mouseHover: boolean = false;

  @Input() client: Client;

  /* @Output() selected = new EventEmitter<number[]>(); */
  @Output() create = new EventEmitter<Client>();
  @Output() update = new EventEmitter<Client>();
  @Output() remove = new EventEmitter<Client>();
  @Output() cancel = new EventEmitter<any>();

  form = this.fb.group({
    clientName: ['', [Validators.required, Validators.maxLength(80)]],
    shortName: ['', [Validators.required, Validators.maxLength(20)]],
    contact: ['', [Validators.required, Validators.maxLength(80)]],
    email: [
      '',
      [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+')
      ]
    ],
    website: [
      '',
      [
        Validators.required,
        Validators.maxLength(80),
        Validators.pattern('[A-Za-z0-9]+\\.[A-Za-z0-9.]+[A-za-z0-9]+')
      ]
    ],
    phone: ['', [Validators.required, Validators.maxLength(80)]],
    address1: ['', [Validators.required, Validators.maxLength(80)]],
    address2: ['', Validators.maxLength(80)],
    city: ['', [Validators.required, Validators.maxLength(80)]],
    state: ['', [Validators.required, Validators.maxLength(80)]],
    postalCode: ['', [Validators.required, Validators.maxLength(12)]],
    country: ['', [Validators.required, Validators.maxLength(80)]],
    hourRate: ['100', Validators.required],
    halfHourRate: ['55', Validators.required],
    active: true
  });

  constructor(private fb: FormBuilder) {}

  get clientNameControl() {
    return this.form.get('clientName') as FormControl;
  }

  get shortNameControl() {
    return this.form.get('shortName') as FormControl;
  }

  get contactControl() {
    return this.form.get('contact') as FormControl;
  }

  get emailControl() {
    return this.form.get('email') as FormControl;
  }

  get phoneControl() {
    return this.form.get('phone') as FormControl;
  }

  get websiteControl() {
    return this.form.get('website') as FormControl;
  }

  get address1Control() {
    return this.form.get('address1') as FormControl;
  }

  get cityControl() {
    return this.form.get('city') as FormControl;
  }

  get stateControl() {
    return this.form.get('state') as FormControl;
  }

  get postalCodeControl() {
    return this.form.get('postalCode') as FormControl;
  }

  get countryControl() {
    return this.form.get('country') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.client && this.client.id) {
      this.exists = true;
      this.form.patchValue(this.client);
    }
  }

  createClient(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateClient(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.update.emit({ ...this.client, ...value });
    }
  }

  removeClient(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.client, ...value });
  }

  cancelClient(form: FormGroup) {
    //const { value } = form;
    this.cancel.emit();
  }
}
