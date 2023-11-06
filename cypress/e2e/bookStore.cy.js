/// <reference types='cypress' />

describe('Book Store app', () => {
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: ''
  };

  const user = {
    username: 'skas',
    password: 'Qazxsw!13'
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
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.contains('a', book.title)
      .click();
    cy.get('#description-label')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide an ability to delete the book from cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('[role="row"]', book.title)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book deleted`);
    });
  });
});
