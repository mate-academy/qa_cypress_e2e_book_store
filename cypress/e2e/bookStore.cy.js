/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/');
  });

  it('User flow in BookStore', () => {

    cy.get('#userName')
    .type('DragonbornDovakin');

    cy.get('#password')
    .type('12345Qwerty!');

    cy.get('#login')
    .should('contain', 'Login')
    .click();

    cy.get('#userName-value')
    .should('contain', 'DragonbornDovakin');

    cy.get('#gotoStore')
    .should('contain', 'Go To Book Store')
    .click();

    cy.get('[placeholder="Type to search"]')
    .type('Speaking JavaScript');

    cy.get('.mr-2')
    .click();

    cy.get('#description-wrapper')
    .should('contain', 'Description');

    cy.get('.btn')
    .contains('Add To Your Collection')
    .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Book added to your collection.');
  });

    cy.get('.btn')
    .contains('Profile')
    .click();

    cy.get('.rt-td')
    .should('contain', 'Speaking JavaScript')
    .and('contain', 'Axel Rauschmayer')
    .and('contain', 'O\'Reilly Media');

    cy.get('#delete-record-undefined')
    .click({ force: true });

    cy.get('#closeSmallModal-ok')
    .click()

    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Book deleted.')
  });
    
  });
});
