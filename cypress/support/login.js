Cypress.Commands.add('login', (username = 'user_test_qa', password = 'Qwerty12345!') => {
  cy.visit('/login');
  cy.findByPlaceholder('UserName').type(username);
  cy.findByPlaceholder('Password').type(password);
  cy.get('#login').click();
  cy.url().should('include', '/profile');
});