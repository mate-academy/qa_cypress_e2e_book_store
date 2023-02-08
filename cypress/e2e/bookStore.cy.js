/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'batman',
    password: 'Robin777!'
  }

  const book = {
    name: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere'
  }
  before(() => {

  });

  it('sohuld provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName')
      .type(user.username);
    cy.findByPlaceholder('Password')
      .type(user.password + '{enter}');
    cy.get('#userName-value')
      .should('contain', user.username);

  });
  it('should provide an ability to search for the book and add to cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/books');
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.findByPlaceholder('Type to search')
    .type(book.name);
    cy.get('[role="row"]')
    .should('contain', book.name)
    cy.contains('a', book.name)
    .click();
    cy.contains('#description-wrapper', 'Description')
    .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
     .click();
    cy.on('window:alert', (str) => {
      expect(str)
      .to.equal(`Book added to your collection.`);
  });

  });

  it('should provide an ability to remove book from cart', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
    .click()
    cy.get('[id="closeSmallModal-ok"]')
    .click()
  });
});

