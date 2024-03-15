/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  const username = 'testBenedict';
  const password = 'Pa$$w0rd!';

  it('should allow to login', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').should('contain.text', 'Login').click();
    cy.url().should('contain', '/profile');
  });

  it('should allow to search for the book', () => {
    const bookName = 'Speaking JavaScript';

    cy.login(username, password);
    cy.visit('/books');
    cy.get('#searchBox').type(bookName);
    cy.get('[href="/books?book=9781449365035"]')
      .should('contain.text', bookName);
    cy.get('.rt-td').should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-td').should('contain.text', 'O\'Reilly Media');
  });
});
