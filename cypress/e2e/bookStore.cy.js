/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Sylvwind',
    password: 'Qwert321!'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: ''
  };

  const alertMessage = {
    added: 'Book added to your collection',
    deleted: 'Book deleted'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should provide an ability to log in', () => {
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

  it('should provide an ability to navigate to Book Store', () => {
    cy.login();
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
      expect(alert).to.equal(alertMessage.added);
    });
  });

  it('should provide an ability to delete book from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('.menu-list')
      .contains('Profile')
      .click();
    cy.get('.rt-table')
      .should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleted);
    });
  });
});
