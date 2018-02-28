export interface Task {
  clientId: string;
  createDate: any;
  fixedRate: boolean;
  hourRate: number;
  halfHourRate: number;
  hours: number;
  taskDate: string;
  taskDescription: string;
  total: number;
  invoiceId?: string;
  id?: string;
}

export interface Tasks {
  client: object;
  clientId: string;
  createDate: any;
  fixedRate: boolean;
  hourRate: number;
  halfHourRate: number;
  hours: number;
  taskDate: string;
  taskDescription: string;
  total: number;
  invoiceId?: string;
  id: string;
}

export interface TasksCollection {
  tasks: Tasks[];
  sumHours: number;
  sumTotal: number;
}
