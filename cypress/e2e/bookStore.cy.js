/// <reference types='cypress' />

describe('Book store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should test the book store website', () => {
    // login
    cy.get('input[placeholder="UserName"]').type('PanJan');
    cy.get('input[placeholder="Password"]').type('Passw0rd!');
    cy.get('#login').contains('Login').click();
    // assert username and URL
    cy.get('#userName-value').should('contain', 'PanJan');
    cy.url().should('include', '/profile');
    // navigate to the BookStore
    cy.get('span.text').contains('Book Store').click();
    // search
    cy.get('input[placeholder="Type to search"]')
      .type('Speaking JavaScript{enter}');
    // description of the book
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript');
    // add to cart
    cy.get('button').contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    // go to profile page
    cy.get('span.text').contains('Profile').click();
    // assert
    cy.get('div.rt-tbody').should('contain', 'Speaking JavaScript');
    // delete book from cart
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.reload();
  });
});
