/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
    cy.get('[data-cy="username-field"]').type('YourUsername');
    cy.get('[data-cy="password-field"]').type('YourPassword');
    cy.get('[data-cy="sign-in-btn"]').click();
  });

  it('should login and navigate to Book store', () => {
    cy.url().should('include', '/profile');
    cy.get('.username').should('contain', 'YourUsername');
    cy.get('[data-cy="book-store-btn"]').click();
    cy.url().should('include', '/bookstore');
  });

  it('should add a book to the collection', () => {
    cy.get('[data-cy="search-box"]').type('Speaking JavaScript');
    cy.get('[data-cy="speaking-javascript"]').click();
    cy.get('.description').should('contain', 'Description of the book');
    cy.get('[data-cy="add-to-collection-btn"]').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.get('[data-cy="profile-btn"]').click();
    cy.get('.shopping-list').should('contain', 'Speaking JavaScript');
  });

  it('should delete the book from the collection', () => {
    cy.get('[data-cy="delete-btn"]').click();
    cy.get('.shopping-list').should('not.contain', 'Speaking JavaScript');
  });
});
