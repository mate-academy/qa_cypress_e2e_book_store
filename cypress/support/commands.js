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

//const { generateInput } = require("../support/generation_input");

//Cypress.Commands.add('registrationNewUser', () => {
  //const user = generateInput();

  //cy.visit('register')
  //cy,get('#firstname').type()

  //cy.request('POST', '/users', user)
    //.then( response => ({ ...response.body.user, ...user}));

//});

Cypress.Commands.add('logInNewUser', () => {
  cy.fixture('fixtures').then((data) => {  
  
   cy.request('POST', 'https://demoqa.com/Account/v1/Login',{
      userName: data.username,
      password: data.password,      
    })
    .then(response => {
      cy.setCookie('token',response.body.token);
      cy.setCookie('userID',response.body.userId);
      cy.setCookie('userName',response.body.username);
      cy.setCookie('expires',response.body.expires);
    })
  });

});