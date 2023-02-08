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
Cypress.Commands.add('login', (username, password) => {
    cy.request({
       url: 'https://demoqa.com/Account/v1/Login',
       method: 'POST',
       body: {
        userName: username,
        password
       }
    })
    .then(response => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userName', response.body.username);
        cy.setCookie('userID', response.body.userId);
    });
});

// Cypress.Commands.add('deleteBook', () => {
//     cy.request({
//        url: 'https://demoqa.com/BookStore/v1/Book',
//        method: 'DELETE',
//        body: {
//         isbn: "9781449365035",
//         userId: "6139a2e5-24d1-4424-8ec9-29dc9a8101cc"
//        }
//     });
// });
