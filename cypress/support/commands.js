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

Cypress.Commands.add('findById', (id) => {
  cy.get(`[id="${id}"]`);
});

Cypress.Commands.add('AlertBookAdded', () => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`);
  });
});

Cypress.Commands.add('AlertBookDeleted', () => {
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book deleted.`);
  });
});

Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: 'huraji',
      password: 'Qwert!1234'
    }
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('userName', response.body.username);
  });
});
