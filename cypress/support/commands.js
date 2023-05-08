Cypress.Commands.add('login', () => {
  cy.request('POST', '/Account/v1/Login', { userName: 'Olya', password: 'Test123*' })
    .then((response) => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('userName', response.body.username);
      cy.setCookie('expires', response.body.expires);
    });
});

Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder=${placeholder}]`)
});
