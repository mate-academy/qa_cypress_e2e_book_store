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

/*
Cypress.Commands.add('login', (userName) => {
    cy.get('#userName')
        .type(userName);
});
*/

Cypress.Commands.add('newUser', (userName) => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/User',
        body: {
          'userName': userName,
          'password': '@Password_1',
        },
    })
});

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Login',
        body: {
          'userName': `Pablo42`,
          'password': '@Password_1',
        },
        }).then((response) => {
            cy.setCookie('token', `${response.body.token}`);
            cy.setCookie('userID', `${response.body.userId}`);
            cy.setCookie('expires', `${response.body.expires}`);
            cy.setCookie('userName', `${response.body.username}`);
    })
});

Cypress.Commands.add ('addBook', () => {
    cy.login()
    cy.visit('books')

    cy.get('div.books-wrapper')
    .contains('Pocket Guide')
      .click();

  cy.get('div.mt-2.fullButtonWrap.row')
    .contains('Add')
      .click();
    
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
    });
});
