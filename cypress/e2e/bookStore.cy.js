/// <reference types='cypress' />

describe('Book Store app', () => {
  it('should let user to login', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#userName-value').should('contain', 'Dmytro');
    cy.url().should('include', '/profile');
  });

  it('should add a book to the collection', () => {
    cy.viewport(750, 600);
    cy.login();
    cy.visit('/profile');
    cy.contains('.btn', 'Book Store').click();
    cy.get('[placeholder="Type to search"]').click();
    cy.get('[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.contains('O\'Reilly Media');
    cy.contains('.action-buttons', 'Speaking JavaScript').click();
    cy.contains('.btn', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should delete a book from the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
