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

// Basic
Cypress.Commands.add('login', (username, password) => {
  cy.intercept('POST', '/Account/v1/GenerateToken')
  .as('auth')
  cy.get('[placeholder="UserName"]')
  .type(username);
  cy.get('[placeholder="Password"]')
  .type(password);
  cy.contains('#login', 'Login')
  .click()

  cy.wait('@auth')
});

// Advanced
Cypress.Commands.add('loginByRequest', (username, password) => {
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
    userName: username, password: password}).then((responce) => {
    cy.setCookie('token', responce.body.token)
    cy.setCookie('userID', responce.body.userId)
    cy.setCookie('userName', responce.body.username)
    cy.setCookie('expires', responce.body.expires)
    cy.visit('/profile')
  })
})