/// <reference types='cypress' />

describe('Name of the group', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login in registered account', () => {
    cy.login();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain.text', 'asdf');
  });

  it('should add book to your collection', () => {
    cy.addBook();
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
  });

  it('should delete a book from your collection', () => {
    cy.addBook();
    cy.visit('/profile');
    cy.deleteAddedBook();
  });
});
