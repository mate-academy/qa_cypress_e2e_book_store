/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'sajevymur',
    password: 'Testpass!1'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to log in', () => {
    cy.get('#userName')
      .type(user.userName);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.userName);
    cy.url()
      .should('contain', '/profile');
  });

  it('should provide an ability to search for the book and add to cart',
    () => {
      cy.login();
      cy.visit('/profile');
      cy.get('#gotoStore')
        .click();
      cy.get('#searchBox')
        .type('Speaking JavaScript');
      cy.contains('a', 'Speaking JavaScript')
        .click();
      cy.get('#description-label')
        .should('be.visible');
      cy.contains('#addNewRecordButton', 'Add To Your Collection')
        .click();
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
      });
    });

  it('should provide an ability to delete a book from cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.get('a')
      .should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
