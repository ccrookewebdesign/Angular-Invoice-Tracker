import { Action } from '@ngrx/store';

import { Client } from '../../models/client.model';

export const LOAD_CLIENTS = '[Clients] Load Clients';
export const LOAD_CLIENTS_FAIL = '[Clients] Load Clients Fail';
export const LOAD_CLIENTS_SUCCESS = '[Clients] Load Clients Success';
export const TOGGLE_SHOW_ARCHIVED = '[Clients] Toggle Show Archived';

export class LoadClients implements Action {
  readonly type = LOAD_CLIENTS;
}

export class LoadClientsFail implements Action {
  readonly type = LOAD_CLIENTS_FAIL;
  constructor(public payload: any) {}
}

export class LoadClientsSuccess implements Action {
  readonly type = LOAD_CLIENTS_SUCCESS;
  constructor(public payload: Client[]) {}
}

export class ToggleShowArchived implements Action {
  readonly type = TOGGLE_SHOW_ARCHIVED;
  constructor(public payload: boolean) {}
}

export const CREATE_CLIENT = '[Clients] Create Client';
export const CREATE_CLIENT_FAIL = '[Clients] Create Client Fail';
export const CREATE_CLIENT_SUCCESS = '[Clients] Create Client Success';

export class CreateClient implements Action {
  readonly type = CREATE_CLIENT;
  constructor(public payload: Client) {}
}

export class CreateClientFail implements Action {
  readonly type = CREATE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export class CreateClientSuccess implements Action {
  readonly type = CREATE_CLIENT_SUCCESS;
  constructor(public payload: Client) {}
}

export const UPDATE_CLIENT = '[Clients] Update Client';
export const UPDATE_CLIENT_FAIL = '[Clients] Update Client Fail';
export const UPDATE_CLIENT_SUCCESS = '[Clients] Update Client Success';

export class UpdateClient implements Action {
  readonly type = UPDATE_CLIENT;
  constructor(public payload: Client) {}
}

export class UpdateClientFail implements Action {
  readonly type = UPDATE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export class UpdateClientSuccess implements Action {
  readonly type = UPDATE_CLIENT_SUCCESS;
  constructor(public payload: Client) {}
}

export const REMOVE_CLIENT = '[Clients] Remove Client';
export const REMOVE_CLIENT_FAIL = '[Clients] Remove Client Fail';
export const REMOVE_CLIENT_SUCCESS = '[Clients] Remove Client Success';

export class RemoveClient implements Action {
  readonly type = REMOVE_CLIENT;
  constructor(public payload: Client) {}
}

export class RemoveClientFail implements Action {
  readonly type = REMOVE_CLIENT_FAIL;
  constructor(public payload: any) {}
}

export class RemoveClientSuccess implements Action {
  readonly type = REMOVE_CLIENT_SUCCESS;
  constructor(public payload: Client) {}
}

export type ClientsAction =
  | LoadClients
  | LoadClientsFail
  | LoadClientsSuccess
  | ToggleShowArchived
  | CreateClient
  | CreateClientFail
  | CreateClientSuccess
  | UpdateClient
  | UpdateClientFail
  | UpdateClientSuccess
  | RemoveClient
  | RemoveClientFail
  | RemoveClientSuccess;
