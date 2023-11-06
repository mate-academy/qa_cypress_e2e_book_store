/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Johnrambo',
    password: 'Johnrambo123!'
  };

  const alert = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
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
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('contain', '/profile');
  });

  it('should provide an ability to search a book and add to collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.get('.action-buttons')
      .click();
    cy.get('.form-label')
      .should('contain', book.description);
    cy.get('#addNewRecordButton')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alert.added);
    });
  });

  it('should provide an ability to delete a book from a collection', () => {
    cy.login();
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', book.title)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alert.deleted);
    });
  });
});
