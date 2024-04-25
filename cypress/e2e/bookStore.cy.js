/// <reference types='cypress' />

describe('Book Store app', () => {
  let user;
  before(() => {
    cy.task('generateUser').then(generateUser => {
      user = generateUser;
    });
    cy.visit('/login');
  });

  it('should provide an opportunity to login', () => {
    cy.get('h1')
      .should('contain.text', 'Login');

    cy.get('#userName').type(user.username);

    cy.get('#password').type(user.password);

    cy.get('#login').click();

    cy.get('#userName-value').should('contain.text', user.username);

    cy.url().should('include', '/profile');
  });

  it('should provide an opportunity to search the product', () => {
    cy.login();

    cy.visit('/books');

    cy.get('#searchBox').type('Speaking JavaScript');

    cy.get('.mr-2')
      .should('contain.text', 'Speaking JavaScript');

    cy.get('.rt-td')

      .should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-td')
      .should('contain.text', `O'Reilly Media`);
  });
});
