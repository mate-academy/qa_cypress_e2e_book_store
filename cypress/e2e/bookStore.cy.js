/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('Bookstore task', () => {
    const username = 'stangetz';
    const password = 'St@n6372';

    cy.findByPlaceholder('UserName').type(username);
    cy.findByPlaceholder('Password').type(password);
    cy.get('button').contains('Login').click();
    cy.get('.form-label').contains('stangetz');
    cy.url().should('contains', '/profile');
    cy.get('#item-2 .text').contains('Book Store').click();
    cy.get('[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('.action-buttons').click();
    cy.get('#ISBN-wrapper > .col-md-9 > #userName-value').should('exist');
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('.main-header').contains('Profile');
    cy.get('div.profile-wrapper').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.reload();
  });
});
