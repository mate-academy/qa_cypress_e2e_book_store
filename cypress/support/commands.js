
Cypress.Commands.add('login', (username, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    form: true,
    body: {
      userName: username,
      password
    }
  }).then((response) => {
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('userName', response.body.username);
    cy.setCookie('token', response.body.token);
    cy.setCookie('expires', response.body.expires);
  });
});
