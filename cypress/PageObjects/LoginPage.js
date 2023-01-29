class LoginPage {
  elements = {
    usernameInput: () => cy.get("input[placeholder='UserName']"),
    passwordInput: () => cy.get("input[placeholder='Password']"),
    loginBtn: () => cy.get("#login"),
  };
  navigate() {
    cy.visit("/login");
  }

  typeUsername(username) {
    this.elements.usernameInput().type(username);
  }

  typePassword(password) {
    this.elements.passwordInput().type(password);
  }

  clickSubmit() {
    this.elements.loginBtn().click();
  }
}

module.exports = new LoginPage();
