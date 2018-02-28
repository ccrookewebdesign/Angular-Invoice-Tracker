/* export interface Client {
  id?: string;
  clientName?: string;
} */

export interface Client {
  createDate: any;
  clientName: string;
  shortName: string;
  contact: string;
  email: string;
  phone: string;
  website: string;
  address1: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  hourRate: number;
  halfHourRate: number;
  active: boolean;
  address2?: string;
  id?: string;
}
