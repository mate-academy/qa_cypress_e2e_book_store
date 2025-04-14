/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'stangetz';
  const password = 'St@n6372';

  beforeEach(() => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(username);
    cy.findByPlaceholder('Password').type(password);
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/profile');
  });
  it('should add a book to the collection', () => {
    cy.get('#item-2 .text').contains('Book Store').click();
    cy.get('[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('#ISBN-wrapper > .col-md-9 > #userName-value').should('exist');
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('.main-header').contains('Profile');
    cy.get('div.profile-wrapper').contains('Speaking JavaScript');
  });
  it('should delete a book from the collection', () => {
    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('.main-header').contains('Profile');
    cy.get('div.profile-wrapper').contains('Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
