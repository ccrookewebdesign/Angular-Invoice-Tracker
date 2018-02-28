import { ClientsEffects } from './clients.effect';
import { TasksEffects } from './tasks.effect';
import { InvoicesEffects } from './invoices.effect';
import { UserEffects } from './user.effect';

export const effects: any[] = [
  ClientsEffects,
  TasksEffects,
  InvoicesEffects,
  UserEffects
];

export * from './clients.effect';
export * from './tasks.effect';
export * from './invoices.effect';
export * from './user.effect';
