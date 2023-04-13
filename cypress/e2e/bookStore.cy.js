/// <reference types='cypress' />

describe('Book Store app', () => {
  it('Login with valid creds', () => {
    cy.visit('/login');

    cy.get('#userName').type('nkond.test');
    cy.get('#password').type('Passwprd!123');
    cy.contains('.text-right button', 'Login').click();

    cy.get('#userName-value').should('contain.text', 'nkond.test');
    cy.assertPageUrl('/profile');
  });

  it('Add Book', () => {
    cy.visit('/login');

    cy.get('#userName').type('nkond.test');
    cy.get('#password').type('Passwprd!123');
    cy.contains('.text-right button', 'Login').click();

    cy.wait(4000);

    cy.visit('/profile');
    cy.get('#gotoStore').click();

    cy.findByPlaceholder('Type to search').type('Speaking JavaScript{enter}');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.contains('.btn', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('Delete Book', () => {
    cy.visit('/login');

    cy.get('#userName').type('nkond.test');
    cy.get('#password').type('Passwprd!123');
    cy.contains('.text-right button', 'Login').click();

    cy.wait(4000);

    cy.visit('/profile');

    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tbody', 'Speaking JavaScript').find('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
