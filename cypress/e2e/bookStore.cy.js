/// <reference types='cypress' />

describe('Successful login', () => {
  beforeEach(() => {
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
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Book added to your collection!');
      return true; 
    });
  });

  it('Delete Book', () => {
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tbody', 'Speaking JavaScript').find('#delete-record-undefined').click({ force: true });
    cy.get('#closeSmallModal-ok').click();
    cy.contains('a', 'Speaking JavaScript').should('not.exist');
  });
});
