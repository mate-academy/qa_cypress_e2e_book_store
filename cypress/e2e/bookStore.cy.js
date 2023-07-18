/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'johnbrown12',
    password: 'Johnbrown12!'
  };

  const book = {
    bookTitle: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere',
    isbn: '9781449365035'
  };

  const alertMessage = {
    deleted: 'Book deleted.'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should allow to log in and add,delete the book from collection', () => {
    cy.findByPlaceholder('UserName').type(user.username);

    cy.findByPlaceholder('Password').type(user.password);

    cy.findById('login').click();

    cy.findById('userName-value').should('contain.text', user.username);

    cy.url().should('include', '/profile');

    cy.findById('gotoStore').should('contain.text', 'Go To Book Store')
      .click();

    cy.findById('searchBox').type(book.bookTitle);

    cy.contains('a', book.bookTitle).click();

    cy.findById('ISBN-wrapper').should('contain.text', book.isbn);

    cy.findById('title-wrapper').should('contain.text', book.bookTitle);

    cy.findById('description-wrapper').should('contain.text', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.visit('/profile');

    cy.contains('a', book.bookTitle).should('be.visible');

    cy.contains('[role="row"]', book.bookTitle).find('[title = "Delete"]')
      .click();

    cy.findById('closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.deleted);
    });
  });
});
