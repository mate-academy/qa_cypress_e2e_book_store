/// <reference types='cypress' />

Cypress.on('uncaught:exception', () => {
  return false;
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  return cy.get(`[placeholder='${placeholder}']`);
});

Cypress.Commands.add('login', (username, password) => {
  cy.visit('https://demoqa.com/login');
  cy.findByPlaceholder('UserName').type(username);
  cy.findByPlaceholder('Password').type(password);
  cy.get('#login').click();
});
