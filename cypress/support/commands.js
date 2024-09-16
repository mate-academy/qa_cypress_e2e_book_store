/* eslint-disable object-shorthand */
/* eslint-disable quote-props */
// eslint-disable-next-line max-len
Cypress.Commands.add('login', (username = 'Qwerty', password = 'Qwerty123@') => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    form: true,
    body: {
      'userName': username,
      'password': password
    }
  }).then((response) => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('userID', response.body.userId);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userName', response.body.username);
  });
  cy.visit('/profile');
});
