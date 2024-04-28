/// <reference types='cypress' />

describe('Book Store app', () => {
  let user;
  before(() => {
    cy.visit('/login');
    user = {
      username: 'OlenaTest',
      password: 'Pass123!'
    };
  });

  it('', () => {
    it('should allow to login', () => {
      cy.visit('/login');
      cy.get('#userName').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login').click();
      cy.get('#userName-value').should('not.have.value', user.username);
      cy.url().should('include', '/profile');
    });

    it('should allow to search for the book', () => {
      cy.login();
      cy.visit('/books');
      cy.get('.form-control').type('Speaking JavaScript');
      cy.get('.rt-table').should('contain.text', 'Speaking JavaScript');
      cy.get('.rt-table').should('contain.text', 'Axel Rauschmayer');
      cy.get('.rt-table').should('contain.text', '\'Reilly Media');
    });
  });
});
