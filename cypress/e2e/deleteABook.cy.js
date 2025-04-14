/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'kakarotto',
    password: '1234Qwert!'
  };
  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  };
  beforeEach(() => {
    cy.visit('/login');
  });
  it('should delete a book', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('contain', '/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('label#userName-value.form-label')
      .should('contain', book.description);
    cy.contains('.btn', 'Add To Your Collection').click();
    cy.visit('/profile');
    cy.contains('a', book.title).should('contain', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.checkPopUp('Book deleted.');
  });
});
