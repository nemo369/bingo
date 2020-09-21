/* eslint-disable camelcase */
export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  token: string;
  isActive: boolean;
  response: string;
}
export interface CredentialRequest {
  email: string;
  password: string;
}
export interface NewUser {
  name: string;
  email: string;
  password: string;
}

export interface ErrorObj {
  data: any;
  status: number;
}
