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

  it('should provide an ability to login user', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', 'Polina.Romanenko');
    cy.url().should('include', '/profile');
  });

  it('should navigate logged in user to the Book store', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').click();
  });

  it('should find "Speaking JavaScript"', () => {
    cy.login();
    cy.visit('/books');
    cy.findByPlaceholder('Type to search').type(book.title);

    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should provide an ability to add book to the collection', () => {
    cy.login();
    cy.visit('/books');
    cy.findByPlaceholder('Type to search').type(book.title);

    cy.get(`a`).contains(book.title).click();

    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it('should assert Speaking JavaScript in your shopping list', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('.rt-tr-group', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should delete the Speaking JavaScript book from your list', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('.rt-tr-group', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher)
      .find('#delete-record-undefined')
      .click();

    cy.get('.modal-content')
      .should('contain', 'Do you want to delete this book?');
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book deleted.');
    });
  });
});
