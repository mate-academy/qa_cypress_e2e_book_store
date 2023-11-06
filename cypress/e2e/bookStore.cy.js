/// <reference types='cypress' />

describe('Book Store app', () => {
  const username = 'Qwerty';
  const password = 'Qwerty123@';
  const bookAdded = 'Book added to your collection.';
  const bookDelete = 'Book deleted.';
  const bookTitle = 'Speaking JavaScript';
  const bookDescription = 'Like it or not, JavaScript is everywhere these';

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should provide an ability to Log In', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', username);
    cy.url().should('contain', '/profile');
  });

  it('should provide ability to add the book to the collection', () => {
    cy.login(username, password);
    cy.url().should('contain', '/profile');

    cy.get('.menu-list').contains('Book Store').click();
    cy.get('[placeholder="Type to search"]').type(bookTitle);
    cy.get('[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper').should('contain', bookDescription);
    // eslint-disable-next-line cypress/no-force
    cy.get('.text-right > #addNewRecordButton')
      .click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(bookAdded);
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', 'Speaking JavaScript');
  });

  it('should provide ability to delete book from the collection', () => {
    cy.login(username, password);
    cy.url().should('contain', '/profile');

    cy.get('.menu-list').contains('Profile').click();
    cy.get('.rt-table').should('contain', 'Speaking JavaScript');

    cy.get('#delete-record-undefined > svg').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(bookDelete);
    });
  });
});
