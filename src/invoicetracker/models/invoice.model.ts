import { Tasks } from './task.model';

export interface Invoice {
  createDate: any;
  clientId: string;
  dueDate: string;
  title: string;
  invoicePaid: boolean;
  sentDate: string;
  invoiceTotal: number;
  notes: string;
  paidDate: string;
  client: object;
  tasks?: Tasks[];
  id?: string;
}

export interface Invoices {
  createDate: any;
  clientId: string;
  dueDate: string;
  title: string;
  invoicePaid: boolean;
  sentDate: string;
  invoiceTotal: number;
  notes: string;
  paidDate: string;
  tasks: Tasks[];
  client: object;
  id?: string;
}
