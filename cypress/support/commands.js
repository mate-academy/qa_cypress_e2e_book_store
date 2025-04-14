Cypress.Commands.add('login', (userName, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      userName,
      password
    }
  }).then((response) => {
    cy.setCookie('username', response.body.username);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
  });
});
