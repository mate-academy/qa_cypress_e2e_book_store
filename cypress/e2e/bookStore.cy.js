/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/books');
    cy.viewport(1800, 1200);
  });

  // eslint-disable-next-line max-len
  it('should be able to login, add book to the collection and delete it', () => {
    cy.get('#login').click();
    cy.get('#userName').type('JasiuXXX');
    cy.get('#password').type('#4425ASt');
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'JasiuXXX');
    cy.url().should('include', '/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('[href="/books?book=9781449365035"]').click();
    // eslint-disable-next-line max-len
    cy.get('.form-label').should('contain.text', 'Like it or not, JavaScript is everywhere');
    cy.get('.text-right > #addNewRecordButton').click();
    // eslint-disable-next-line cypress/no-force, max-len
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click({ force: true });
    cy.get('.profile-wrapper').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
