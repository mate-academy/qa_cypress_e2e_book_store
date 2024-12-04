/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login();
    cy.visit('/profile');
  });

  it('correct login user', () => {
    cy.login();

    cy.url()
      .should('include', '/profile');

    cy.get('#userName-value')
      .should('contain', 'testUsername');
  });

  it('adding the book to shopping list', () => {
    cy.login();

    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type('Speaking Javascript');

    cy.contains('[role="row"]', 'Speaking JavaScript')
      .should('contain', 'Axel Rauschmayer')
      .and('contain', 'O\'Reilly Media');

    cy.get('.action-buttons').click();

    cy.get('#description-label')
      .should('contain', '');

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection');

    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.equal('Book added to your collection');
    });
  });
  it('delete book', () => {
    cy.login();

    cy.get('.menu-list')
      .contains('Profile')
      .click();

    cy.get('.rt-table')
      .should('contain', 'Speaking JavaScript');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
