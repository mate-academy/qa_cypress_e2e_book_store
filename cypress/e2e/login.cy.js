/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'kakarotto',
    password: '1234Qwert!'
  };
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login with valid creds', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('contain', '/profile');
  });
});
