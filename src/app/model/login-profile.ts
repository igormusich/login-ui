import { LoginCredential } from './login-credential'

export class LoginProfile {
  public loginId: string;
  public credentials: Array<LoginCredential> = [];

  constructor(loginId: string, credentials: Array<LoginCredential>) {
    this.loginId = loginId;
    this.credentials = credentials;
  }
}
