Cypress.Commands.add('assertPageUrl', (url) => {
  cy.url().should('equal', Cypress.config().baseUrl + url);
});

Cypress.Commands.add('signIn', (user) => {
  cy.get('#userName').type(user.userName);
  cy.get('#password').type(user.password);
  cy.get('#login').click();
});
