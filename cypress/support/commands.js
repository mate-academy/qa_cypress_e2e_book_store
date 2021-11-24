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

Cypress.Commands.add('login', (userName = 'ATester', password = '123456Qwerty!') => {
  cy.visit('/login');
    cy.get('#userName').type(userName);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile')
    cy.get('#userName-value').should('contain', userName);
})

Cypress.Commands.add('login1', (username = 'ATester', password = '123456Qwerty!') => { 
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: username,
      password: password
    }
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('userName', response.body.username);
  })
})

// If you uncomment the code below, but basic homework will crash
// Cypress.Cookies.defaults({
//   preserve: ['token', 'expires', 'userID', 'userName']
// })