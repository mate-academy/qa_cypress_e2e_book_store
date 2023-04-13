/// <reference types='cypress' />

// import { user } from '../support/testData';

describe('Book Store app', () => {
  // before(() => {
    
  // });

  it('login', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#userName-value').should('contain', 'serhio1234');
    cy.url().should('include', '/profile');
  });

  it('add book', () => {
    cy.viewport(750, 600);
    cy.login();
    cy.visit('/profile');
    cy.contains('.btn', 'Book Store').click();
    cy.get('[placeholder="Type to search"]').click().type('Speaking JavaScript');
    cy.contains('O\'Reilly Media');
    cy.contains('.action-buttons', 'Speaking JavaScrip').click();
    cy.contains('.btn', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  })
  });

    it('delete book', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
