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
const userName = 'qa_test22';
const password = '123Qwert!';
// Cypress.Commands.add('login', (username, password) => { 
//   cy.visit('https://demoqa.com/login');
//   cy.get('#userName').type(username);
//   cy.get('#password').type(password)
//   cy.get('#login').click();
//   cy.url().should('include','/profile');
//  });
Cypress.Commands.add('login', () => { 
  cy.request({
    method: 'POST',
    url:'https://demoqa.com/Account/v1/Login',
    body: {
          "userName": userName,
          "password": password,
    }
  }).then((resp) => {
    cy.setCookie('token', resp.body.token);
    cy.setCookie('userID', resp.body.userId);
    cy.setCookie('expires', resp.body.expires);
    cy.setCookie('userName', resp.body.username);
  });
});
