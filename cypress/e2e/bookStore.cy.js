/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'ben',
    password: 'Qwer123@'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, Javascript is everywhere these days'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to Log in', () => {
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
  it('should provide an ability to add a book to the Cart', () => {
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
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
  it('should provide an ability to delete a book from the Cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', book.title)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
