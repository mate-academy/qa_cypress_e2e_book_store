class Login {
  constructor() {
    this.username = "#userName";
    this.password = "#password";
    this.loginBtn = "button#login";
    this.usernameLabel = "label#userName-value";
  }

  typeUsername(username) {
    cy.get(this.username).type(username);
  }
  typePswd(pswd) {
    cy.get(this.password).type(pswd);
  }

  submitLogin() {
    cy.get(this.loginBtn).click();
  }

  verifyLogin(username) {
    cy.get(this.usernameLabel).should("have.text", username);
  }

  verifyLoginURL() {
    cy.url().should("include", "/profile");
  }
}

export default Login;
