/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'q12341234';
  const password = 'qW#12345';
  const book = 'Git Pocket Guide';
  const description = 'This pocket guide';

  before(() => {
    cy.visit('/login');
  });

  it('should be able to log in, add the book and delete the book', () => {
    cy.contains('Login').click();
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('.text-right > #userName-value').should('contain', username);

    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book);
    cy.contains(book).click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .should('contain', description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    cy.visit('/profile');
    cy.contains(book);
    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
