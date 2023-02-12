/// <reference types='cypress' />

const user = {
  userName: 'zorka',
  password: 'Test1234!',
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('login using existing account', () => {
    //login
    cy.findByPlaceholder('UserName')
      .type(user.userName);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.contains('button', 'Login')
      .click();

    //assert username
    cy.get('#userName-value')
      .should('have.text', user.userName);
    //assert new url
    cy.url()
      .should('contain', '/profile');
  });
});
