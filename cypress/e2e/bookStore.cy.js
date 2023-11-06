/// <reference types='cypress' />


describe('Book Store app', () => {
  const user = {
    userName: 'farida',
    password: '19580607Okan@'
  };

  before(() => {
    cy.visit('/login');
  });

  it('Login verification', () => {
    cy.get('#userName')
      .type(user.userName);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('contain', user.userName);
  });

  it('Check for adding a book', () => {
    cy.login();
    cy.visit('/profile')
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.get('.action-buttons')
      .click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('Check for deleting a book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();

  });
});
