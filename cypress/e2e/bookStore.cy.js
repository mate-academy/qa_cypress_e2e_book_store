/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'UserN',
    password: 'Qwerty12345!'
  };

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days',
    author: 'Axel Rauschmayer'
  };

  const alerMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should add book to user collection', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('Go To Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alerMessage.added);
    });

    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible');
    cy.contains(book.author).should('be.visible');

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });

  it('should delete book from user collection', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('Go To Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('Add To Your Collection').click();

    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible');
    cy.contains(book.author).should('be.visible');

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alerMessage.added);
      cy.removeAllListeners('window:alert');
      cy.on('window:alert', (secondAlert) => {
        expect(secondAlert).to.equal(alerMessage.deleted);
      });
    });

    cy.visit('/profile');

    cy.contains('a', book.title).should('not.exist');
  });
});
