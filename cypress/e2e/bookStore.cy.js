/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'user12345-test',
    password: 'UserTest12345!'
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('should sign in the user', () => {
    cy.signIn(user);
    cy.assertPageUrl('/profile');
    cy.get('#userName-value').should('contain.text', user.userName);
  });

  it('should navigate to book store and add a book', () => {
    cy.signIn(user);
    cy.get('#gotoStore').click();
    cy.visit('/books');
    cy.assertPageUrl('/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-label').should('exist');
    cy.contains('button', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.');
    });
  });

  it('should delete a book', () => {
    cy.signIn(user);
    cy.contains('a', 'Speaking JavaScript').should('exist');
    cy.contains('.rt-tr-group', 'Speaking JavaScript').should('exist')
      .get('[title="Delete"]').click();
    cy.contains('.modal-content', 'Do you want to delete this book?').should('exist')
      .contains('button', 'OK').click();
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });
});
