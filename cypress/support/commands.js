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
  const userName = 'Anastasia'
  const password = 'Qwerty1!'
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
    userName: userName,
    password: password,
  }).then((response) => {
    cy.setCookie('token', response.body.token)
    cy.setCookie('userID', response.body.userId)
    cy.setCookie('expires', response.body.expires)
  })
})

Cypress.Commands.add('addTheBook', () => {

cy.get('#gotoStore')
  .click();

cy.get('[placeholder="Type to search"]')
  .type('Speaking JavaScript');

cy.contains('a', 'Speaking JavaScript')
  .click();

cy.contains('#addNewRecordButton', 'Add To Your Collection')
  .click();

cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`);
});

})

