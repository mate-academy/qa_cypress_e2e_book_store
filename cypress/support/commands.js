// *******************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// *******************************************
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
  const username = 'test123';
  const Password = 'Test123!';

  cy.visit('https://demoqa.com/login');

  cy.get('#userName').click();

  cy.get('#userName').type(username);

  cy.get('#password').click();

  cy.get('#password').type(Password);

  cy.get('#login').click();

  cy.get('#userName-value').should('contain', username);

  cy.url().should('include', '/profile');
});

// I also try to use the cy.request, but receive the error 'Because this error occurred during a before each', please, give me advice, what I did wrong

// Cypress.Commands.add('login', (userName, password) => {

//     cy.request('POST', 'https://demoqa.com/login',  {

//             userName: userName,
//             password: password

//    })
//         .then(response => {
//           cy.setCookie('token', response.body.token)
//       })

// });
