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

Cypress.Commands.add('login', (username = 'Pupka', password = 'Pupka@123') => {
cy.visit('https://demoqa.com/login');

cy.get('#userName')
.type(username);
            
cy.get('#password')
.type(password);
            
cy.get('#login')
.click({ force: true });

cy.url()
.should('include','/profile');

cy.get('#userName-value')
.contains('Pupka')
.should('exist');

cy.get('#submit.btn.btn-primary')
.contains('Log out')
.should('exist');
})
