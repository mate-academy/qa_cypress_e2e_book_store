/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'TestingOvsianka',
    password: 'Qwerty@12345'
  };

  it('should allow to login', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('have.value', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to search for the book', () => {
    const bookName = 'Speaking JavaScript';
    cy.login(user.username, user.password);
    cy.visit('/books');
    cy.get('.form-control').type(bookName);
    cy.get('.rt-table').should('contain.text', bookName);
    cy.get('.rt-table').should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-table').should('contain.text', '\'Reilly Media');
  });
});
