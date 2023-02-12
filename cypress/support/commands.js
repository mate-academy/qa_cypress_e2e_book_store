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

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('login', (userName, password) => {
  cy.request({
    url: 'https://demoqa.com/Account/v1/Login',
    method: 'POST',
    body: {
      userName,
      password,
    },
  }).then(response => {
    cy.setCookie('userName', response.body.username);
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
  });
});

Cypress.Commands.add('addBookToTheBasket', (userId, collectionOfIsbns) => {
  cy.request({
    url: 'https://demoqa.com/BookStore/v1/Books',
    method: 'POST',
    body: {
      userId,
      collectionOfIsbns,
    },
  }).then(response => {
    cy.setCookie('collectionOfIsbns', response.body.collectionOfIsbns);
    cy.setCookie('userId', response.body.userId);
  });
});