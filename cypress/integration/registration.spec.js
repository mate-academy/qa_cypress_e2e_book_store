/// <reference types='cypress' />

describe('Name of the group', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should login in registered account', () => {
    cy.login();
  });

  it('should add book to your collection', () => {
    cy.addBook();
  });

  it('should delete a book from your collection', () => {
    cy.addBook();
    cy.deleteAddedBook();
  });
});
