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

Cypress.Commands.add('login', (username, password) => { 
    cy.findByPlaceholder('UserName')
      .type(username);
    cy.findByPlaceholder('Password')
      .type(password);
    cy.get('#login')
      .click();
 });

 Cypress.Commands.add('login', (username, password) => { 
    cy.viewport(1100, 1100);
    cy.request({
        url: 'https://demoqa.com/Account/v1/Login', 
        method: 'POST',
        body: {
            userName : username,
            password
        },
    }).then(response => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userName', response.body.username);
        cy.setCookie('userID', response.body.userId);
    })
 });

 Cypress.Commands.add('addBook', (name, desc) => {
    cy.visit('https://demoqa.com/profile');
    cy.url()
        .should('contain', '/profile'); 
    cy.get('#gotoStore')
        .click();
    cy.get('#searchBox')
        .type(name);
    cy.contains('a', name)
        .click();
    cy.get('#description-wrapper')
        .should('contain', desc);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
        .click();
  });

 Cypress.Commands.add('checkAddPopUp', () => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    });
});

Cypress.Commands.add('checkDeletePopUp', () => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book deleted.`)
    });
});