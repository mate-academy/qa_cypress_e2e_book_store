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

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false
})

Cypress.Commands.add('login', (username, password) =>{
  cy.visit('/login');
  cy.get('#userName').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();
})


Cypress.Commands.add('addBook', (bookName, bookNameID) =>{
  cy.get('#gotoStore').click({force: true});
  cy.get('#searchBox').type(`${bookName}{enter}`);
  cy.get(`.rt-tr-group :first-child [id="see-book-${bookName}"]`).click();
  cy.get('.text-right #addNewRecordButton').click({force: true});
  cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click({force: true});
  cy.get(`#see-book-${bookNameID} > a`).should('exist')
})

Cypress.Commands.add('delBook', (bookNameID) =>{
  cy.get('#delete-record-undefined').click();
  cy.get('#closeSmallModal-ok').click();
  cy.get(`#see-book-${bookNameID} > a`).should('not.exist');
})
