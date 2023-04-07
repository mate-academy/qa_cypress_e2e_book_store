/// <reference types='cypress' />

const { generateData } = require('../support/generate');

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

// Cypress.Commands.add('login', () => {
//   const { userName, password } = generateData();

//   cy.request({
//     method: 'POST',
//     url: '/Account/v1/Login',
//     body: {
//       userName: userName,
//       password: password
//     }
//   })
//     .then(response => {
//       cy.setCookie('token', response.body.token)
//       cy.setCookie('userId', response.body.userId)
//       cy.setCookie('username', response.body.username)
//       cy.setCookie('expires', response.body.expires)
//     })
// })

Cypress.Commands.add('login', () => {
  const { userName, password } = generateData();

  cy.findByPlaceholder('UserName').type(userName);
  cy.findByPlaceholder('Password').type(password);

  cy.get('#login').click();
})
