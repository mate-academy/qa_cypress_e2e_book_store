/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'lara_c',
    password: 'Password!1'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these day'
  };

  const allertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it.only('should allow to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);

    cy.findByPlaceholder('Password')
      .type(user.password);

    cy.get('#login')
      .click();

    cy.url()
      .should('include', '/profile');

    cy.get('#userName-value')
      .should('contain', user.username);

    cy.contains('button', 'Log out')
      .should('be.visible');
  });

  it.only('should allow to add a book to user collection', () => {
    cy.login(user.username, user.password);

    cy.visit('/profile');

    cy.get('#gotoStore')
      .click({ force: true });

    cy.findByPlaceholder('Type to search')
      .type(book.title);

    cy.contains('a', 'Speaking JavaScript')
      .click();

    cy.get('#title-wrapper')
      .should('contain', book.title);

    cy.get('#author-wrapper')
      .should('contain', book.author);

    cy.get('#author-wrapper')
      .should('contain', book.author);

    cy.get('#publisher-wrapper')
      .should('contain', book.publisher);

    cy.get('#description-wrapper')
      .should('contain', book.description);

    cy.contains('button', 'Add To Your Collection')
      .click({ force: true });

    cy.on('window:alert', (str) => {
      expect(str).to.equal(allertMessage.added);
    });

    cy.contains('ul li span', 'Profile')
      .click({ force: true });

    cy.contains('div span a', book.title)
      .should('be.visible');

    cy.contains('div', book.author)
      .should('be.visible');

    cy.contains('div', book.publisher)
      .should('be.visible');
  });

  it.only('should delete book from user collection', () => {
    cy.login(user.username, user.password);

    cy.visit('/profile');

    cy.get('#gotoStore')
      .click({ force: true });

    cy.findByPlaceholder('Type to search')
      .type(book.title);

    cy.contains('a', 'Speaking JavaScript')
      .click();

    cy.get('#title-wrapper')
      .should('contain', book.title);

    cy.get('#author-wrapper')
      .should('contain', book.author);

    cy.get('#author-wrapper')
      .should('contain', book.author);

    cy.get('#publisher-wrapper')
      .should('contain', book.publisher);

    cy.get('#description-wrapper')
      .should('contain', book.description);

    cy.contains('button', 'Add To Your Collection')
      .click({ force: true });

    cy.contains('ul li span', 'Profile')
      .click({ force: true });

    cy.contains('div span a', book.title)
      .should('be.visible');

    cy.contains('div', book.author)
      .should('be.visible');

    cy.contains('div', book.publisher)
      .should('be.visible');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(allertMessage.deleted);
    });
  });
});
