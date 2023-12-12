/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });
  // const fName = 'testName';
  // const lName = 'testSurname';

  const uName = 'testUsername';
  const uPassword = 'testPassword1!';
  it('correct login user', () => {
    cy.get('#userName')
      .type(uName);

    cy.get('#password')
      .type(uPassword);

    cy.get('#login')
      .click();

    cy.url()
      .should('include', '/profile');

    cy.get('#userName-value')
      .should('contain', uName);
  });

  it.only('adding the book to shopping list', () => {
    cy.login();

    cy.visit('/profile');

    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type('Speaking Javascript');

    cy.contains('[role="row"]', 'Speaking JavaScript')
      .should('contain', 'Axel Rauschmayer')
      .and('contain', 'O\'Reilly Media');

    cy.get('.action-buttons').click();

    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .should('contain', 'Like it or not, JavaScript is everywhere');

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.equal('Book added to your collection');
    });
  });
  it('delete book', () => {
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
