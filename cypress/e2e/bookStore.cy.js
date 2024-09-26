/// <reference types='cypress' />
const user = {
  UserName: 'TestUser048',
  Password: 'Qwerty01!'
};

const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these days'
};

describe('Book Store app', () => {
  it('should have an ability to log in', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(user.UserName);
    cy.get('#password')
      .type(user.Password);
    cy.get('#login')
      .click();
    cy.contains('#userName-value', user.UserName);
    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should have an ability to add books', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('.action-buttons')
      .click();
    cy.get('#description-wrapper')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should have an ability to delete books', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('#delete-record-undefined')
      .click();
    cy.contains('.modal-body', 'Do you want to delete this book?');
    cy.contains('#closeSmallModal-ok', 'OK')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
