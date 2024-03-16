/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'xanepulas',
    password: 'Test@123'
  };

  it('should provide abbility to login', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain.text', user.username);
    cy.url().should('include', '/profile');
  });
  it('should allow to search for the book', () => {
    cy.Login();
    cy.visit('/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('.mr-2').should('contain.text', 'Speaking JavaScript');
    cy.get('.rt-td').should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-td').should('contain.text', `O'Reilly Media`);
  });
});
