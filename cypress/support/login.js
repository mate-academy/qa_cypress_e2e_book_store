Cypress.Commands.add('login', (username = 'Niko', password = '12345Qwert!') => {
  cy.visit('https://demoqa.com/login');
  cy.get('[placeholder="UserName"]')
    .type(username);
  cy.get('[placeholder="Password"]')
    .type(password);
  cy.get('#login')
    .click();
  cy.url().should('include', '/profile');
});