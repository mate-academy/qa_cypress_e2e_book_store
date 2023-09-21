Cypress.Commands.add('login', (username, password) => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
  });