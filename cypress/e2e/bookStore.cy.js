/// <reference types='cypress' />

describe('User Profile', () => {
  const username = 'haha.test11';
  const password = 'Passwprd!123';

  it('Login', () => {
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.contains('.text-right button', 'Login').click();
    cy.get('#userName-value').should('contain.text', username);
    cy.assertPageUrl('/profile');
  });

  it('Add Book', () => {
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.contains('.text-right button', 'Login').click();
    cy.get('#userName-value').should('contain.text', username);
    cy.assertPageUrl('/profile');

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
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.contains('.text-right button', 'Login').click();
    cy.get('#userName-value').should('contain.text', username);
    cy.assertPageUrl('/profile');

    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tbody', 'Speaking JavaScript').find('[id^="delete-record"]').click({ force: true });
    cy.get('#closeSmallModal-ok').click();
    cy.contains('a', 'Speaking JavaScript').should('not.exist');
  });
});
