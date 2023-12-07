/// <reference types='cypress' />

const { MyUser } = require('../support/MyUser');
const user = MyUser;

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
    cy.viewport(1800, 1200);
  });

  it('Adding book to collection', () => {
    // Filling data
    cy.get('input[placeholder="UserName"]').type(user.userName);
    cy.get('input[placeholder="Password"]').type(user.password);
    // Validation
    cy.get('button').contains('Login').click();
    // Logged in page assertions
    cy.get('label').should('contain', user.userName);
    cy.url().should('equal', 'https://demoqa.com/profile');
    // Book store navigate
    cy.get('.text').contains('Book Store').click();
    cy.get('input[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('.rt-td').contains('Speaking JavaScript').click();
    // Description assertion
    cy.get('.col-md-9').should('contain', 'JavaScript is everywhere these');
    cy.get('.books-wrapper').should('contain', 'Description');
    // Adding to colection
    cy.get('button').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('.text').contains('Profile').click();
    cy.url().should('equal', 'https://demoqa.com/profile');
    cy.get('a').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').contains('OK').click();
  });
});
