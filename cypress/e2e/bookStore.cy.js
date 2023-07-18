/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: '7Hokage7',
    password: 'Rasnegan!9'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to add a book to collection', () => {
    cy.login();

    cy.visit('/profile');

    cy.contains('#item-2', 'Book Store').click();

    cy.findByPlaceholder('Type to search').type(book.title);

    cy.contains('a', book.title).click();

    cy.get('#title-wrapper').should('contain', book.title);

    cy.get('#author-wrapper').should('contain', book.author);

    cy.get('#publisher-wrapper').should('contain', book.publisher);

    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });
  });

  it('should allow to delete a book from collection', () => {
    cy.login();

    cy.visit('/profile');

    cy.contains('.rt-tr.-odd', book.title).should('contain', book.author)
      .and('contain', book.publisher)
      .find('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();

    cy.contains(book.author, book.name, book.publisher).should('not.exist');
  });
});
