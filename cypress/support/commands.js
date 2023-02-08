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
Cypress.Commands.add('findByPlaceholder', (placeholder) => {
    cy.get(`[placeholder="${placeholder}"]`);
});

const username = 'NotUserName'

const password = 'NotApa$$word123'

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/login')

    cy.findByPlaceholder('UserName')
    .type(username)

   cy.findByPlaceholder('Password')
    .type(password)
   
   cy.contains('#login', 'Login')
    .click()

   cy.url()
    .should('contain', '/profile')
      
   cy.contains('label', username)
    .should('be.visible');
  })

  const bookname = 'Speaking JavaScript'
  
Cypress.Commands.add('addbook', () => {
    cy.contains('#item-2', 'Book Store')
     .click()

    cy.findByPlaceholder('Type to search')
     .type(bookname)

    cy.contains('a', 'Speaking JavaScript')
     .click()
     
    cy.contains('button', 'Add To Your Collection')
     .click()
})