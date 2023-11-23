/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1920, 1080);
  });

  it('should log in', () => {
    cy.login('alexuser', 'Alex777!');
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', 'alexuser');
  });

  it('should add book', () => {
    cy.login('alexuser', 'Alex777!');
    cy.get('.btn').contains('Go To Book Store').click();
    cy.url().should('contain', 'books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.action-buttons a').contains('Speaking JavaScript').click();
    cy.get('#title-wrapper').should('contain', 'Speaking JavaScript');
    cy.get('#author-wrapper').should('contain', 'Axel Rauschmayer');
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere');
    cy.get('.btn').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('.btn').contains('Profile').click();
    cy.get('.rt-td').contains('Speaking JavaScript');
  });

  it('should add book', () => {
    cy.login('alexuser', 'Alex777!');
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', 'alexuser');
    cy.get('.rt-td').contains('Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
