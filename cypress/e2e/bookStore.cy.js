/* eslint-disable no-useless-escape */
/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'neon100',
    password: 'Neon100!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not'
  };

  before('', () => {
    cy.visit('/login');
  });

  it('should provide the ability to login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.contains('#userName-value', user.username);
  });

  it('should allow to add that is found to the user collection', () => {
    cy.login();
    cy.visit('/books');
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.contains('.action-buttons', book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it.only('should delete a book from the user collection', () => {
    cy.login();
    cy.visit('/books');
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.contains('.action-buttons', book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
    // cy.contains('.text-left > #addNewRecordButton').click();
    cy.get().click(); // '/profile'
    // cy.contains('#item-3', '.btn btn-light active').click();
    cy.get('[style="flex: 70 0 auto; width: 70px; max-width: 70px;"]').click();
    cy.get('.modal-body').should('contain', 'Do you want to delete this book?');
    cy.get('#closeSmallModal-ok').click();
    // cy.on('window:alert', (alert) => {
    //  expect(alert).to.equal('Book deleted.');
    // });
    cy.get('.ReactTable').should('not.contain', 'Speaking JavaScript');
  });
});
// cy.get('#gotoStore').should('contain', 'Go To Book Store').click();
