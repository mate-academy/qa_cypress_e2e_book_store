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

Cypress.Commands.add('login', () => {
  cy.fixture('user').then(user => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password + '{enter}');
  });
});

Cypress.Commands.add('loginRequest', (
  userName = 'asdf',
  password = 'qweASD123!$'
) => { cy.request('POST', 'Account/v1/Login', {
    userName,
    password
  })
    .then(response => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('expires', response.body.expires);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('userName', response.body.username);
    });
});

Cypress.Commands.add('addBook', () => {
  cy.login();
  cy.deleteBooks()
  cy.get('#gotoStore').click();
  cy.get('#searchBox').type('Speaking JavaScript');
  cy.contains('a', 'Speaking JavaScript').click();
  cy.contains('button', 'Add To Your Collection').click();
});

Cypress.Commands.add('deleteBooks', () => {
  cy.get('.buttonWrap > .text-right > #submit').click();
  cy.get('#closeSmallModal-ok').click();
});

Cypress.Commands.add('deleteAddedBook', () => {
  cy.get('#delete-record-undefined > svg > path').click();
  cy.get('#closeSmallModal-ok').click();
});


