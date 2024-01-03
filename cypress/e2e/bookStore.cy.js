/// <reference types='cypress' />

describe('Book Store app', () => {
  // before(() => {});
  const user = {
    username: 'AH',
    password: 'P@s$w0rd'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    // eslint-disable-next-line max-len
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.'
  };

  it('should provide ability to log in for registered user', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    // eslint-disable-next-line max-len
    cy.get('#userName-value', { timeout: 10000 }).should('contain', user.username);
    cy.url().should('include', '/profile');
    cy.login();
    cy.visit('/books');
    cy.url().should('include', '/books');
  });
  it('should find book by title and add to the profile', () => {
    cy.login();
    cy.visit('/books');
    cy.url().should('include', '/books');
    cy.get('#searchBox').type(book.title, '{enter}');
    // eslint-disable-next-line no-useless-escape
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('#see-book-Speaking\\ JavaScript').click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`, { timeout: 10000 });
    });
    cy.visit('/profile');
  });
  it('should delete book from profile', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('.action-buttons > #delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
