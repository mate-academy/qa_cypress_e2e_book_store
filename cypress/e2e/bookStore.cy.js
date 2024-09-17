/// <reference types='cypress' />
const { userData } = require('../support/userData');

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    const user = userData();

    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain.text', 'vsova_test_user');
    cy.url().should('include', '/profile');
  });

  it('should allow to search for the book', () => {
    cy.apiLogin();
    cy.visit('/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.mr-2').should('contain.text', 'Speaking JavaScript');
    cy.get('.rt-td').should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-td').should('contain.text', `O'Reilly Media`);
  });
});
