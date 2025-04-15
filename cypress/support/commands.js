Cypress.Commands.add('findByPlaceholder', (placeholder) => {
  cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('login', (username = 'july', password = 'July123!') => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName: username,
      password
    }
  }).then((responce) => {
    cy.setCookie('token', responce.body.token);
    cy.setCookie('userID', responce.body.userId);
    cy.setCookie('expires', responce.body.expires);
    cy.setCookie('userName', responce.body.username);
  });
});
