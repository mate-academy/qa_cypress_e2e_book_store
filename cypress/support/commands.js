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

Cypress.Commands.add('logIn', () => {
  cy.visit('https://demoqa.com/login')

  cy.get('#userName').type('SuperUser')

  cy.get('#password').type('SuperPassword100!')

  cy.get('#login').click()
});

Cypress.Commands.add('loginRequest', () => {
  cy.visit('https://demoqa.com/login');
  
  cy.request('POST', 'https://demoqa.com/Account/v1/Login',
  {"userName":"SuperUser","password":"SuperPassword100!"})
    .then(response => {
      window.localStorage.setItem('jwt', response.body.user.token)
    });
});