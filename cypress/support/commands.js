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

Cypress.Commands.add('login', (username, password) => { 
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName:"iziumova",
      password:"Test_123!"
    },
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userName', response.body.username);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
  });

  // Cypress.Commands.add('addBook', () => { 
  //   cy.request({
  //     method: 'POST',
  //     url: 'https://demoqa.com/BookStore/v1/Books',
  //     body: {
  //       userId: "1d684dca-8bb7-4faa-bccb-218f8fcdb85b", 
  //       collectionOfIsbns: [{isbn: "9781449365035"}]
  //     },
  //   }).then((response) => {
  //     cy.setCookie('token', response.body.token);
  //     cy.setCookie('userName', response.body.username);
  //     cy.setCookie('userID', response.body.userId);
  //     cy.setCookie('expires', response.body.expires);
  //   });
  
  //   })
})