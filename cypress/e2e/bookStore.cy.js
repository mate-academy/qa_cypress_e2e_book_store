/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'Ianatoll';
  const password = 'Qa!12341234';
  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere'
  };
  const alertTextAdded = 'Book added to your collection.';
  const alertTextDeleted = 'All Books deleted.';
  beforeEach(() => {
    cy.clearAllCookies();
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.get('#userName-value', { timeout: 10000 }).should('contain', username);
    cy.url().should('contain', 'profile');
  });

  it('shloud provide ability to add book to the cart', () => {
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book.title);
    cy.get('[href="/books?book=9781449365035"]').click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.get('.text-right #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertTextAdded);
    });
  });
  it('should provide ability to delete dook', () => {
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click();
    cy.get('.rt-table').should('contain', book.title);
    cy.get('.buttonWrap > .text-right > #submit').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertTextDeleted);
    });
  });
});
