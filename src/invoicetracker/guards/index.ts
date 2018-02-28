import { AuthGuard } from './auth.guard';
import { ClientsGuard } from './clients.guard';
import { ClientExistsGuard } from './client-exists.guard';
import { TasksGuard } from './tasks.guard';
import { TaskExistsGuard } from './task-exists.guard';
import { InvoicesGuard } from './invoices.guard';
import { InvoiceExistsGuard } from './invoice-exists.guard';

export const guards: any[] = [
  AuthGuard,
  ClientsGuard,
  ClientExistsGuard,
  TasksGuard,
  TaskExistsGuard,
  InvoicesGuard,
  InvoiceExistsGuard
];

export * from './auth.guard';
export * from './clients.guard';
export * from './client-exists.guard';
export * from './tasks.guard';
export * from './task-exists.guard';
export * from './invoices.guard';
export * from './invoice-exists.guard';
