/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.clearAllCookies();
  });

  const username = 'naidaBecker';
  const password = 'Test123#';
  const alertTextAdded = 'Book added to your collection.';
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  it('should provide an ability to login', () => {
    cy.visit('https://demoqa.com/login');
    cy.findByPlaceholder('UserName').type(username);
    cy.findByPlaceholder('Password').type(password);
    cy.get('#login').click();
    cy.urlShouldContainText('profile');
    cy.get('#userName-value').should('contain', 'naidaBecker');

    cy.get('.menu-list').contains('Book Store').click();
    cy.urlShouldContainText('books');
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('.action-buttons').contains(book.title).click();
    cy.get('.profile-wrapper').should('exist');
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertTextAdded);
    });

    cy.contains('#item-3', 'Profile').click();
    cy.get('.rt-table').should('contain', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('.modal-content').should('exist');
    cy.get('.modal-body').should('contain', 'Do you want to delete this book?');
    cy.get('#closeSmallModal-ok').click();
  });
});
