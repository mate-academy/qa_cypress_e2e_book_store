/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'miponkin',
    password: 'Pa$sw0rd'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should able to log-in with valid creds', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();

    cy.contains('#userName-value', user.username);
    cy.url().should('include', '/profile');
  });

  it('should able to add book to the cart', () => {
    cy.login();

    cy.visit('/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();

    cy.get('#description-wrapper').should('be.visible');

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should able to delete the book from cart', () => {
    cy.login();

    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
