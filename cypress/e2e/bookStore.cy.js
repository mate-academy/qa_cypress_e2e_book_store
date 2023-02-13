/// <reference types='cypress' />
// import cypressConfig = require("../../cypress.config");

const user = {
  username: 'ginger',
  password: '1210Pasport!@',
}
const book = {
  name: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you',
};

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login')
  });

  it('should provide an ability to login', () => {
    cy.get('[placeholder="UserName"]')
      .type(user.username)
    cy.get('[placeholder="Password"]')
      .type(user.password)
    cy.contains('#login', 'Login')
      .click();

    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('have.text', user.username);
  });

  it('should provide an ability to search for the book and add to the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('[id="item-2"]', 'Book Store')
      .click();
    cy.get('[placeholder="Type to search"]')
      .type(book.name)
    cy.contains('[role="row"]', book.name).should('contain', book.author)
      .and('contain', book.publisher);
    cy.contains('a', book.name)
      .click();
    cy.contains('#description-wrapper', 'Description')
      .should('contain', 'Like it or not, JavaScript is everywhere')
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert)
        .to.equal('Book added to your collection.')
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login(user.username, user.password);

  cy.visit('/profile');

  cy.contains('[role="row"]', book.name)
    .should('contain', book.author)
    .and('contain', book.publisher);
  cy.get('#delete-record-undefined')
    .click();
  cy.get('#closeSmallModal-ok')
    .click();
  cy.on('window:alert', (alert) => {
      expect(alert)
      .to.equal('Book deleted.');
  });

});
});
