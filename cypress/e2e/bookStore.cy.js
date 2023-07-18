/// <reference types='cypress' />

describe('Book Store app', () => {
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted'
  };

  before(() => {
    cy.visit('/');
  });

  it.only('should allow to login', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#userName-value').should('contain', 'QaTester');
    cy.url().should('include', '/profile');
  });

  it.only('should allow to add a book into the users collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);

    cy.contains('a', book.title).click();

    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('.text-right > #addNewRecordButton').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.added);

      cy.contains('a', book.title).should('be.visible');
    });
  });

  it.only('should allow to delete a book from the users collection', () => {
    cy.login();
    cy.visit('/profile');

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.deleted);
    });
  });
});
