/// <reference types='cypress' />

describe('Demoblaze app', () => {

  const user = {
    username: 'gooddamn',
    password: 'Passsword123'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it ('should register user', () => {
    cy.get('#signin2').click();
    cy.wait(2000);
    cy.get('#sign-username').type(user.username);
    cy.get('#sign-password').type(user.password);
    cy.get('[onclick="register()"]').click();
  });


  it ('should register user', () => {
    cy.get('#signin2').click();
    cy.wait(2000);
    cy.get('#sign-username').type(user.username);
    cy.get('#sign-password').type(user.password);
    cy.get('[onclick="logIn()"]').click({force: true});
  });

  it ('should add a product to cart', () => {
    cy.contains('a', 'Samsung galaxy s6').click();
    cy.get('[onclick="addToCart(1)"]').click();
    cy.get('[href="cart.html"]').click();
    cy.contains('tbody', 'Samsung galaxy s6').should('contain', 'Samsung galaxy s6');
  })
});

