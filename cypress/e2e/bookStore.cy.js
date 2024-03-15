/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'qa_test',
    password: 'Qwerty123!'
  };

  it('should provide an ability to login', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to search for the book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('.mr-2', 'Speaking JavaScript').should('be.visible');
    cy.contains('.rt-td', 'Axel Rauschmayer').should('be.visible');
    cy.contains('.rt-td', 'O\'Reilly Media').should('be.visible');
  });
});
