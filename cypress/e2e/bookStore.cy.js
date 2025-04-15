/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'qwerty',
    password: 'Qwerty1!'
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

  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to login', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
  });

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('.action-buttons')
      .click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('[role="row"]', book.title)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});
