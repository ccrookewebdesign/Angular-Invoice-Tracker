export interface User {
  uid: string;
  displayName: string;
  loggedIn: boolean;
  loading: boolean;
  loaded: boolean;
  error: string;
}

/* export class User implements IUser {
  constructor(public uid: string, public displayName: string) {}
} */
