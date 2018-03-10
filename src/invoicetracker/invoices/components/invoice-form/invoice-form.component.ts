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

import { Invoice } from '../../../models/invoice.model';
import { Client } from '../../../models/client.model';

@Component({
  selector: 'invoice-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./invoice-form.component.scss'],
  templateUrl: './invoice-form.component.html'
})
export class InvoiceFormComponent implements OnChanges, OnInit {
  exists = false;
  mouseHover: boolean = false;

  @Input() invoice: Invoice;
  @Input() clients: Client[];
  @Input() selectedClient: Client;

  //@Output() selected = new EventEmitter<number[]>();
  @Output() create = new EventEmitter<Invoice>();
  @Output() update = new EventEmitter<Invoice>();
  @Output() remove = new EventEmitter<Invoice>();
  @Output() cancel = new EventEmitter<any>();

  form = this.fb.group({
    clientId: [this.selectedClient, [Validators.required]],
    dueDate: ['', [Validators.required]],
    title: ['', [Validators.required]],
    invoicePaid: false,
    sentDate: [''],
    invoiceTotal: [0, [Validators.required]],
    notes: ['', [Validators.required]],
    paidDate: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.selectedClient) {
      this.form.patchValue({ clientId: this.selectedClient.id });
    }
  }

  get clientIdControl() {
    return this.form.get('clientId') as FormControl;
  }

  get dueDateControl() {
    return this.form.get('dueDate') as FormControl;
  }

  get titleControl() {
    return this.form.get('title') as FormControl;
  }

  get invoicePaidControl() {
    return this.form.get('invoicePaid') as FormControl;
  }

  get sentDateControl() {
    return this.form.get('sentDate') as FormControl;
  }

  get invoiceTotalControl() {
    return this.form.get('invoiceTotal') as FormControl;
  }

  get notesControl() {
    return this.form.get('notes') as FormControl;
  }

  get paidDateControl() {
    return this.form.get('paidDate') as FormControl;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.invoice && this.invoice.id) {
      this.exists = true;
      this.form.patchValue(this.invoice);
    }
  }

  createInvoice(form: FormGroup) {
    const { value, valid } = form;
    if (valid) {
      this.create.emit(value);
    }
  }

  updateInvoice(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.invoice, ...value });
    }
  }

  removeInvoice(form: FormGroup) {
    const { value } = form;
    this.remove.emit({ ...this.invoice, ...value });
  }

  cancelInvoice(form: FormGroup) {
    this.cancel.emit();
  }
}
