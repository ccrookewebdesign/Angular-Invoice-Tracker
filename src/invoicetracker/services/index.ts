import { ClientsService } from './clients.service';
import { TasksService } from './tasks.service';
import { InvoicesService } from './invoices.service';

export const services: any[] = [ClientsService, TasksService, InvoicesService];

export * from './clients.service';
export * from './tasks.service';
export * from './invoices.service';
