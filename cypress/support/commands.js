/// <reference types='cypress' />
Cypress.Commands.add('login', (login, password) => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      password: `${password}`,
      userName: `${login}`
    }
  })
    .then((response) => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('userID', response.body.userId);
      cy.setCookie('expires', response.body.expires);
    });
});
