Cypress.Commands.add('login', (username = 'Pupka', password = 'Pupka@123') => {
  cy.request({
    method: 'POST',
    url: 'https://demoqa.com/Account/v1/Login',
    body: {
      "userName": username,
      "password": password
    }

}).then((response) => {
  cy.setCookie('token', response.body.token);
  cy.setCookie('expires', response.body.expires);
  cy.setCookie('userID', response.body.userId);
  cy.setCookie('userName', response.body.username);

  cy.request('https://demoqa.com/Account/v1/Login').as('login')

  cy.get('@login').should((response) => {
    expect(response.status)
    .to.eq(200);
    expect(response)
    .to.have.property('headers');
  })

}).then((response) => {
  cy.request({
    method: 'GET',
    url: 'https://demoqa.com/BookStore/v1/Books',
})
cy.request('https://demoqa.com/BookStore/v1/Books').as('bookStore')

cy.get('@bookStore').should((response) => {
  expect(response.status)
  .to.eq(200);
  expect(response)
  .to.have.property('headers');
})
})
});