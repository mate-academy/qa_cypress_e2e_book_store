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
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add( 'logIn', (username = 'batman', password = 'Banman!123') => {
    cy.request({
        method: 'POST',
        url: '/Account/v1/Login', 
        body: {
          userName: username,
          password: password,
        },
      }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('userName', response.body.username);
        cy.setCookie('expires', response.body.expires);
      })
});

Cypress.Commands.add('addBook', () => {
    cy.get('#gotoStore').click({force: true});

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.get('.mr-2').click();

    cy.get('#description-wrapper').should('exist');

    cy.contains('.btn','Add To Your Collection')
      .click({force: true});

    cy.once('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
      });     
  
    cy.wait(400);
    
      cy.contains('.btn','Profile').click();

    cy.get('.rt-tbody')
      .should('contain', 'Speaking JavaScript'); 
})