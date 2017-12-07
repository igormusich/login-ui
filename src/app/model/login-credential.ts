export class LoginCredential {

  credentialType: String;
  required: Boolean;

  constructor(credentialType: String, required: Boolean) {
    this.credentialType = credentialType;
    this.required = required;
  }

}
