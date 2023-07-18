/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Adam',
    password: '12345Qwert!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'Reilly Media',
    description: 'Like it or not, Javascript is everywhere these days'
  };

  const alertMessage = {
    deleted: 'Book deleted.'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should allow to login, add a book, and delete the book', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/login');
    cy.get('#userName-value').should('contain', user.username);
    cy.get('#gotoStore').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#title-wrapper').should('contain', book.title);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.visit('/profile');
    cy.contains('a', book.title).should('be.visible');
    cy.contains('[role="row"]', book.title).find('[title = "Delete"]')
      .click();

    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(alertMessage.deleted);
    });
  });
});
