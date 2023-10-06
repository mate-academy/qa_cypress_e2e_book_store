Cypress.Commands.add('getElementById', (id) => {
  cy.get(`#${id}`);
});

Cypress.Commands.add('getElementByAttribute', (name, value) => {
  cy.get(`[${name}="${value}"]`);
});

Cypress.Commands.add('findAndFillInput', (id, value) => {
  cy.getElementById(id).clear();
  cy.getElementById(id).type(value);
});

Cypress.Commands.add('login', (userName, password) => {
  cy.request('POST', '/Account/v1/Login', {
    userName,
    password
  }).then((res) => {
    cy.setCookie('token', res.body.token);
    cy.setCookie('expires', res.body.expires);
    cy.setCookie('userID', res.body.userId);
    cy.setCookie('userName', res.body.username);
    cy.visit('/profile');
  });
});

Cypress.Commands.add('findOneItem', (query) => {
  cy.getElementById('searchBox').type(query);
  cy.contains('a', query).should('exist');
});
