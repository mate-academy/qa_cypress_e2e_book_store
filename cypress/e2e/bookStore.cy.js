/// <reference types='cypress' />

describe('Book Store app', () => {
  it('should add and remove book', () => {
    // login
    cy.visit('/login');
    cy.get('#userName').type('radekqa');
    cy.get('#password').type('Radekqa0*');
    cy.get('#login').click();

    // assert login
    cy.get('#userName-value').should('contain', 'radekqa');
    cy.url().should('equal', 'https://demoqa.com/profile');

    // navigate to book store
    // cy.get('.header-wrapper').contains('Book Store Application').click();
    cy.get('#item-2 .text').contains('Book Store').click();
    cy.get('#searchBox').type('Speaking Javascript');
    cy.get('[href="/books?book=9781449365035"]').click();

    // assert description
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere');

    // add book and assert adding book
    cy.get('.btn.btn-primary').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('[href="/profile?book=9781449365035"]').should('exist');
    cy.get('[title="Delete"]').click();
    cy.get('#closeSmallModal-ok').contains('OK').click();
    cy.reload();
    cy.get('#books-wrapper').should('not.contain', 'Speaking Javascript');

    // cy.on('window:alert', (str) => {
    //   expect(str).to.equal(`Book deleted.`);
    // });
  });
});
