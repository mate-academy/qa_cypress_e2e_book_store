/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Serhii1234',
    password: 'Ss_1234567!'
  };

  it('should login the user, add and delete the book in the collection', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.contains('button', 'Login').click();
    cy.get('#userName-value').should('contain.text', user.username);
    cy.url().should('contain', '/profile');
    cy.visit('/books');
    cy.url().should('contain', 'books');
    cy.get('span.text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('Speaking JavaScript').click();
    cy.get('#description-wrapper').should('contain.text', 'Description');
    cy.contains('button', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.url().should('contain', 'profile');
    cy.get('.rt-table').should('contain.text', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.reload();
    cy.get('.ReactTable').should('not.contain.text', 'Speaking JavaScript');
  });
});
