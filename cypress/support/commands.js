Cypress.Commands.add("loginByApi", (username, password) => {
  cy.request("POST", "https://demoqa.com/Account/v1/Login", {
    userName: username,
    password: password,
  }).then((response) => {
    cy.setCookie("token", response.body.token);
    cy.setCookie("userID", response.body.userId);
    cy.setCookie("expires", response.body.expires);
    cy.setCookie("userName", response.body.username);
  });
});

Cypress.Commands.add("assertBook", (id, book) => {
  cy.get(".rt-td").eq(id).should("contain", book);
});

Cypress.Commands.add("loginByUI", (username, password) => {
  cy.contains("#item-0", "Login").click();
  cy.get('[placeholder="UserName"]').type(username);
  cy.get('[placeholder="Password"]').type(password);
  cy.contains("#login", "Login").click();
  cy.get("#userName-value").should("contain", username);
  cy.url().should("include", "profile");
});
