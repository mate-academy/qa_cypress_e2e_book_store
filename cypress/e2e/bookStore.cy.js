/// <reference types="cypress" />
/// <reference types="..support'" />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'Anton3108',
      password: 'A12345678a!'
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
      description: 'Like it or not, JavaScript is everywhere',
      text: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
    }
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should provide an ability to login', () => {
    cy.get('#userName')
      .type(testData.user.username);

    cy.get('#password')
      .type(testData.user.password);

    cy.get('#login')
      .click();

    cy.get('#userName-value')
      .should('contain', testData.user.username);

    cy.url()
      .should('include', '/profile');
  });

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login(testData.user.username, testData.user.password);

    //cy.visit('https://demoqa.com/profile');

    cy.contains('#item-2', 'Book Store')
      .click();

    cy.get('#searchBox')
      .type(testData.book.name);

    cy.contains('a', testData.book.name)
      .click();

    cy.contains('.form-label', testData.book.text )
      .should('exist');

    cy.contains('button', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

  });

  it('should provide an ability to delete the book from my list', () => {

    cy.login();

    cy.visit('https://demoqa.com/profile');

    cy.contains('.ReactTable', testData.book.name)
      .should('exist');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
