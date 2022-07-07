Cypress.Commands.add('login', (username = 'zxctester', password = '12345Qwert!') => {
  cy.get('#userName')
    .type(username);

  cy.get('#password')
    .type(password);

  cy.get('#login')
    .click();

  cy.url()
    .should('include', '/profile');
});
