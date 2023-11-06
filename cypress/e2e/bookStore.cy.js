/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should login with API', () => {
    cy.login();
  });

  it('should add book to the collection', () => {
    cy.addBook();
  });

  it('should delete a book from the collection', () => {
    cy.deleteBook();
  });
});
