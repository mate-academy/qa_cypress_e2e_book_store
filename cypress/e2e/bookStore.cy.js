/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should log in existing user', () => {
    cy.get('#userName')
      .type('testingagain');
    cy.get('#password')
      .type('Testingagain123$');
    cy.get('#login')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('contain', 'testingagain');
  });

  it('should add a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.contains('[role="row"]', 'Speaking JavaScript')
      .should('contain', 'Axel Rauschmayer')
      .and('contain', 'O\'Reilly Media');
    cy.contains('a', 'Speaking JavaScript')
      .click();
    cy.get('#description-label')
      .should('contain', '');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection');
    });
  });

  it('should delete book', () => {
    cy.login();
    cy.visit('/profile');
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
