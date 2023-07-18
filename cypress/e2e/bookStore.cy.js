/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'anton12',
    password: 'Qwerty12345@'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should allow to successfully login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);

    cy.get('#login').click();

    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('Should allow to successfully add a book to the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('[href="/books?book=9781449365035"]').click();

    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#author-wrapper').should('contain', book.author);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added)
    });
  });

  it('Should allow to successfully delete a book from the collection', () => {
    cy.login();
    cy.visit('/profile');

    cy.get('[href="/profile?book=9781449365035"]').should('contain', book.title);
    cy.get('[role="gridcell"]').should('contain', book.author);

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted)
    });
  });
});
