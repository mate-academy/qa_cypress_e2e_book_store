/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
    cy.get('#userName').type('haha.test11');
    cy.get('#password').type('Passwprd!123');
    cy.contains('.text-right button', 'Login').click();
    cy.get('#userName-value').should('contain.text', '');
    cy.assertPageUrl('/profile');
  });

  it('Add Book', () => {
    cy.visit('/profile');
    cy.get('#gotoStore').click({ force: true });
    cy.get('[placeholder="Type to search"]').type('Speaking JavaScript{enter}');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.contains('.btn', 'Add To Your Collection').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book already present in the your collection!');
    });
  });
});
