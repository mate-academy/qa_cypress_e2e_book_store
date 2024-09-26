/// <reference types='cypress' />
describe('Book Store app', () => {
  const user = {
    username: 'qa_jan24',
    password: '12345Qwert!'
  };
  const book = 'Speaking JavaScript';

  it('should Log in a user', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.url().should('not.include', '/login');
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should search the book', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(book, `{enter}`);
    cy.get('[href="/books?book=9781449365035"]')
      .should('contain', book);
    cy.get('.rt-td, .gridcell').should('contain', 'Axel Rauschmayer');
    cy.get('.rt-td, .gridcell').should('contain', `O'Reilly Media`);
  });
});
