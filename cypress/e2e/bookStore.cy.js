/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'testdata7894',
    password: '*qwertY789.'
  };

  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
    }
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
    cy.get('#userName-value')
     .should('contain', user.username);
    cy.url()
     .should('include', '/profile');

});

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
     .click();
    cy.get('#searchBox')
     .type(book.title);
    cy.get('[href="/books?book=9781449365035"]')
     .click();
    cy.get('#description-wrapper')
     .should('contain', book.description);
    cy.get('#addNewRecordButton')
     .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    })
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
    expect(str).to.equal(`Book deleted.`);
  });
});

});