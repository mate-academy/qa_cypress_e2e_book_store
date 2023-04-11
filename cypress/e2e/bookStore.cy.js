/// <reference types='cypress' />

describe('Book Store app', () => {

  beforeEach(() => {
    cy.visit('/login');
    cy.login();
  });


  it('should login', () => {

    cy.get('#userName-value').contains('Snow228');
    cy.url().should('equal', 'https://demoqa.com/profile');
  });

  it('should add book', () => {
    cy.get('#gotoStore').click();
    cy.get('#searchBox').should('exist').type('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-label').should('exist');
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
});

  it('should delete book', () => {
    cy.url('equal','/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.get('.rt-noData').should('exist').contains('No rows found');
  });
});
