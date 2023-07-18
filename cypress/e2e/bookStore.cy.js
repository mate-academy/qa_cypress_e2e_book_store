/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Adam',
    password: '12345Qwert!'
  }

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  beforeEach(() => {
    cy.visit('/login')
  });

  it('should allow to login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);

    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to add a book user collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible')
  });

  it('should allow to delete a book from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('.text-right > #addNewRecordButton').click();
    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible');
    cy.get('#delete-record-undefined').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book deleted.');
    });
    cy.visit('/profile');
    cy.get('.rt-noData').should('contain', 'No rows found');
  });
});