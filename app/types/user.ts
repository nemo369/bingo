export interface User {
  id: number;
  name: string;
  email: string;
  token: string;
  isActive: boolean;
}
export interface CredentialRequest {
  email: string;
  password: string;
}
export interface NewUser {
  name: string;
  email: string;
  password: string;
  europeCitizenship: boolean;
}
