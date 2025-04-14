/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'tester2024',
    password: 'Pa$$word123'
  };

  it('should allow to login user', () => {
    cy.visit('/login');

    cy.get('#userName').type(user.username);

    cy.get('#password').type(user.password);

    cy.get('button#login').click();

    cy.get('#userName-value')
      .should('contain.text', user.username);

    cy.url().should('include', '/profile');
  });

  it('should allow to find a book', () => {
    cy.login(user);

    cy.get('.text').contains('Book Store')
      .click();

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.get('.action-buttons')
      .should('contain.text', 'Speaking JavaScript');

    cy.get('.rt-td')
      .should('contain.text', 'Axel Rauschmayer');

    cy.get('.rt-td')
      .should('contain.text', `O'Reilly Media`);
  });
});
