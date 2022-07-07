Cypress.Commands.add('login', (username ='OVolkova', password ='!2Qw!2Qw' ) => { 
  cy.get('#userName')
    .type(username);
  cy.get('#password')
    .type(password);
  cy.get('#login')
    .click();
  cy.url()
    .should('include','/profile');
  cy.get('#userName-value')
    .should('contain', 'OVolkova')

})