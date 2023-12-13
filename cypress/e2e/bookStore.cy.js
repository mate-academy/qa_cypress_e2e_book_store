/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'Testowy_1',
    password: '!QAZxsw2'
  };
  const bookTitle = 'Speaking JavaScript';

  before(() => {});

  it('should log in user with ', () => {
    // logging in
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('button').contains('Login').click();
    cy.get('label').contains(user.userName).should('exist');
    cy.url().should('contain', 'profile');

    // adding book to collection
    cy.get('button#gotoStore').click();
    cy.findByPlaceholder('Type to search').type(bookTitle);
    cy.get('a').contains(bookTitle).click();
    cy.get('#description-wrapper').contains('Description :').should('exist');
    cy.get('button').contains('Add To Your Collection').click();
    cy.once('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('.left-pannel').contains('Profile').click();
    cy.get('.rt-tbody').contains(bookTitle).should('exist');
    cy.get('.rt-tr').contains(bookTitle).get('[title="Delete"]').click();
    cy.get('button').contains('OK').click();
  });
});
