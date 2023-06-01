Cypress.Commands.add('login', (username, password) => {
  cy.request({
    url: 'https://demoqa.com/Account/v1/Login',
    method: 'POST',
    body: {
      userName: username,
      password
    }
  }).then(response => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userName', response.body.username);
  });
});
