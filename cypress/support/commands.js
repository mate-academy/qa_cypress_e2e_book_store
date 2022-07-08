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
  cy.get(`[placeholder ="${placeholder}"]`);
});
Cypress.Commands.add('login', () => {
  const username = 'AnnQ'
const password = 'Q123456*q'
  cy.visit('/login')
    cy.findByPlaceholder('UserName').type(username) 

    cy.findByPlaceholder('Password').type(password)
    cy.get('#login').click()
    cy.url().should('include', '/profile')
})
//НЕ працює, розібратись
//Cypress.Commands.add('login', (username = 'AnnQ',
//  password = 'Q123456*q') => {
//    
//  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
//     "userName":username, "password":password
//    })
//    .then (response =>{
//      cy.setCookie('token', response.body.token);
//      cy.setCookie('userName', response.body.username);
//      cy.setCookie('userId', response.body.userId);
//      cy.setCookie('expires', response.body.expires);
//    })
//  })
//
//  Cypress.Commands.add('login', (username = 'AnnQ',
//  password = 'Q123456*q') => {
 //  cy.request({
  //   url: 'https://demoqa.com/Account/v1/Login', 
   //  method: 'POST', 
   //  body: {
   //  "userName": username, 
  //   "password": password
   //  }
   //  })
   // })
