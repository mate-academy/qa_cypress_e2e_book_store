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
    cy.get(`[placeholder="${placeholder}"]`)
});

Cypress.Commands.add('login', () => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Login',
        body: {
            userName: 'FrodoBaggins',
            password: 'Shire123!'
        },
    }).then((response) => {
        cy.setCookie('userName', `${response.body.userName}`);
        cy.setCookie('userID', `${response.body.userId}`);
        cy.setCookie('expires', `${response.body.expires}`);
        cy.setCookie('token', `${response.body.token}`);
    });
});

Cypress.Commands.add('addBook', () => {
    cy.contains('.text', 'Book Store').click({ force: true });
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('#basic-addon2').click();
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('.text-right > #addNewRecordButton').click({ force: true });
});
