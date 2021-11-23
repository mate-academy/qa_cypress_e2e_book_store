Cypress.Commands.add('login', (username = 'MBuryak', password = 'Qwerty123!') => { 
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
 })