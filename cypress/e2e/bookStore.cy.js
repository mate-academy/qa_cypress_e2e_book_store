/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'artem12345',
    password: '12345qwertY!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    pescription: 'Like it or not, JavaScript is everywhere these'
  };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should('not.include', '/login');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to search for the book and add to collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.pescription);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it('should allow to delete the book from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book deleted.');
    });
  });
});
