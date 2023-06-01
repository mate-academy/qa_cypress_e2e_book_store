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

Cypress.Commands.add('checkIsUserLoggedIn', (userName) => {
  cy.url()
      .should('eq', Cypress.config().baseUrl + '/profile');

  cy.get('#userName-value')
      .should('contain.text', userName);
})

Cypress.Commands.add('loginRequest', (userName, password) => {
  cy.request({
    method: 'POST',
    url: '/Account/v1/Login',
    body: {
      userName,
      password
    }
  })
      .then(response => {
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('token', response.body.token);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('userName', response.body.username);

        cy.visit('/profile');

        cy.checkIsUserLoggedIn(userName);
  })
});
