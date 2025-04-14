/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'olgabolga',
    password: 'poland-23QA!',
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o',
  };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it.only('should allow to search for the book and add to collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.get('.action-buttons').click();
    cy.contains('.books-wrapper', book.title).should('contain', book.author).and('contain', book.publisher).and('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`)
  });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3 > .text').click();
    cy.contains('.profile-wrapper', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3 > .text').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
