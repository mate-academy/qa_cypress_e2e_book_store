//Basic login
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('#userName').type(username);
  cy.get('#password').type(password);
  cy.get('#login').click();
});

// Advanced login
Cypress.Commands.add('loginRequest', (username, password) => {
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {userName: username, password: password}).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('userName', response.body.username);
    cy.setCookie('expires', response.body.expires);
    cy.visit('/profile');
  });
});