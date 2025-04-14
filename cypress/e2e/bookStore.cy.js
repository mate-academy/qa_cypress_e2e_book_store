/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'harrypotter',
    password: 'Passwword1!'
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

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should provide the ability to log in with registered creds', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('include', '/profile');
  });

  it('should provide the ability to search a book and add it to cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.contains('a', book.title)
      .click();
    cy.get('#description-wrapper')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.added);
    });
  });

  it('should provide the ability to delete a book from shopping list', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.contains('#item-3', 'Profile')
      .click();
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
