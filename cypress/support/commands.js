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

Cypress.Commands.add('login', (
  username = 'fuxoqon',
  password = '123456Aa$') => {
  cy.request('POST', '/Account/v1/Login', {
    userName: username,
    password
  }).then((response) => {
    const { token, username, userId, expires } = response.body;

    cy.setCookie('userName', username);
    cy.setCookie('userID', userId);
    cy.setCookie('expires', expires);
    cy.setCookie('token', token);

    cy.visit('/profile');
    cy.get('#userName-value').should('contain', username);
    cy.url().should('include', '/profile');
  });
});

Cypress.Commands.add('addBook', () => {
  cy.login();

  cy.get('#gotoStore').click();
  cy.get('#searchBox').type('Speaking JavaScript');
  cy.contains('Speaking JavaScript').click();
  cy.get('.col-md-9')
    .should('contain', 'Like it or not, JavaScript is everywhere');
  cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
  cy.on('window:alert', (str) => {
    expect(str).to.equal('Book added to your collection.');
  });
  cy.visit('/profile');

  cy.get('.ReactTable').should('contain', 'Speaking JavaScript');
});

Cypress.Commands.add('deleteBook', () => {
  cy.addBook();
  cy.get('#delete-record-undefined').click();
  cy.get('#closeSmallModal-ok').click();

  cy.on('window:alert', (str) => {
    expect(str).to.equal('Book deleted.');
  });
  cy.visit('/profile');

  cy.get('.ReactTable').should('not.contain', 'Speaking JavaScript');
});
