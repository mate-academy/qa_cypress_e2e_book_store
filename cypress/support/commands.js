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

// Tworzenie funkcji findByPlaceholder
// funkcja findByPlaceholder przyjmować będzie parametr placeholder którego szukamy
// oraz parametr tag (który jest opcjonalny można ale nie trzeba go podawać)
// funkcja findByPlaceholder działa w ten sposób że szuka na stronie obiektu który
// posiada podany placeholder i w nim staje.
Cypress.Commands.add('findByPlaceholder', (placeholder, tag = 'input') => {
  // znajdź(`taki tag dla którego {placeholder} został podany`)
  cy.get(`${tag}[placeholder="${placeholder}"]`);
});
// Cypress.Commands.add('login', (username, password) => {
//   cy.visit('/login');
//   cy.findByPlaceholderText('UserName').type(username);
//   cy.findByPlaceholderText('Password').type(password);
//   cy.get('button').contains('Login').click();
// });
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.findByPlaceholderText('UserName').type(username);
  cy.findByPlaceholderText('Password').type(password);
  cy.get('button').contains('Login').click();
});
