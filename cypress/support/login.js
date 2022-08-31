Cypress.Commands.add('login', (username = 'Superwoman', password = 'Password123@') => {
  cy.get('#userName')
  .type(username);
  cy.get('[placeholder="Password"]')
  .type(password);
  cy.get('#login')
  .click()
  cy.url()
  .should('include', '/profile')
});
