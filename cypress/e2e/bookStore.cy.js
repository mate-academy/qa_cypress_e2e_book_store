/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login'); 
  });

  it('Should be able to login', () => {
    cy.get('#userName').type('User1');
    cy.get('#password').type('User12345!');
    cy.get('#login').click();
    cy.url().should('include', '/profile')
    cy.contains('User1').should('be.visible', { timeout: 4000 });
  });
  
  it('Should be able to add book', () => {
    cy.login();
    cy.visit('/profile'); 
    cy.contains('User1').should('be.visible', { timeout: 4000 });
    cy.url().should('include', '/profile');
    cy.get('#gotoStore').click({ timeout: 4000 });
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('Speaking JavaScript').click();
    cy.contains('Like it or not, JavaScript is everywhere the').should('be.visible', { timeout: 4000 });
    cy.contains('Add To Your Collection').click({ timeout: 4000 });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
    cy.visit('/profile'); 
    cy.contains('Speaking JavaScript').should('be.visible', { timeout: 4000 });
  });

  it('Should be able to delete book', () => {
    cy.login();
    cy.visit('/profile'); 
    cy.contains('Speaking JavaScript').should('be.visible', { timeout: 4000 });
    cy.url().should('include', '/profile');
    cy.get('#delete-record-undefined').click({ timeout: 4000 });
    cy.get('#closeSmallModal-ok').click({ timeout: 4000 });
  });
});
