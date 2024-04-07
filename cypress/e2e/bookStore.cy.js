/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Polina.Romanenko',
    password: 'Pa$$w0rd!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere'
  };

  beforeEach(() => {
    cy.login();
  });

  it('should provide an ability to login user', () => {
    cy.visit('/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('include', '/profile');
  });

  it('should navigate logged in user to the Book store', () => {
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.url()
      .should('include', '/books');
  });

  it('should find "Speaking JavaScript"', () => {
    cy.visit('/books');
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should provide an ability to add book to the collection', () => {
    cy.visit('/books');
    cy.get('#searchBox')
      .type(book.title);
    cy.get(`a`)
      .contains(book.title)
      .click();
    cy.get('#description-wrapper')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it('should assert Speaking JavaScript in your shopping list', () => {
    cy.visit('/profile');
    cy.contains('.rt-tr-group', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should delete the Speaking JavaScript book from your list', () => {
    cy.visit('/profile');
    cy.contains('.rt-tr-group', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher)
      .find('#delete-record-undefined')
      .click();
    cy.get('.modal-content')
      .should('contain', 'Do you want to delete this book?');
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book deleted.');
    });
    cy.contains('.rt-tr-group', book.title)
      .should('not.exist');
  });
});
