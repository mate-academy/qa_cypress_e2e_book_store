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

Cypress.Commands.add('login',(username = 'Maryna_test', password = '123456Mk*') => {
  cy.request('POST', '/Account/v1/login',{
    userName: username,
    password: password
  }).then(resp =>{
    cy.setCookie('token', resp.body.token);
    cy.setCookie('expires', resp.body.expires);
    cy.setCookie('userID', resp.body.userId);
    cy.setCookie('userName', resp.body.username);
  });  
});