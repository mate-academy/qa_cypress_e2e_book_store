// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

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