/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'test123',
    password: 'Test123!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    pages: '460',
    description: 'Like it or not, JavaScript is everywhere these days-from'
  };

  const allert = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should be possible to log in with valid data', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('contain', '/profile');
  });

  it('Should be possible to search book and add to the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.get('[href="/books?book=9781449365035"]')
      .click();
    cy.get('.profile-wrapper')
      .should('contain', book.title)
      .and('contain', book.author)
      .and('contain', book.publisher)
      .and('contain', book.pages)
      .and('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(allert.added);
    });
  });

  it('Should be possible to delete a book from the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.get('[role="row"]')
      .should('contain', book.title)
      .and('contain', book.author)
      .and('contain', book.publisher);
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(allert.deleted);
    });
  });
});
