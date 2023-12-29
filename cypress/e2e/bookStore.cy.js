/// <reference types='cypress' />

const user = {
  username: 'huraji',
  password: 'Qwert!1234'
};

const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these days'
};

beforeEach(() => {
  cy.visit('/login');
});

describe('Book Store app', () => {
  it('should allow to login with valid credentials', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.findById('login').click();

    cy.url().should('include', '/profile');
    cy.findById('userName-value').should('contain', user.username);
  });

  it('should allow to search for the book and add it to collection', () => {
    cy.login();
    cy.get('.menu-list').contains('Book Store').click();
    cy.findById('searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);

    cy.get('a').contains(book.title).click();
    cy.findById('description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.AlertBookAdded();

    cy.get('.menu-list').contains('Profile').click();
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should allow to delete book from the collection', () => {
    cy.login();
    cy.get('.menu-list').contains('Profile').click();
    cy.findById('delete-record-undefined').click();
    cy.findById('closeSmallModal-ok').click();

    cy.AlertBookDeleted();
  });
});
