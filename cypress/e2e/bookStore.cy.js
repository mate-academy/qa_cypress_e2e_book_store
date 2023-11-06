/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'omelya',
    password: 'Vtnfkk00!'
  };
  const bookAdded = 'Book added to your collection.';
  const bookDeleted = 'Book deleted.';

  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to login', () => {
    cy.get('#userName')
      .type(user.username);

    cy.get('#password')
      .type(user.password);

    cy.get('#login')
      .click();

    cy.url()
      .should('contain', '/profile');

    cy.get('#userName-value')
      .should('contain', user.username);
  });

  it('Should provide an ability to search for the book and add to cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type('Speaking JavaScrip');
    cy.contains('[role="row"]', 'Speaking JavaScript')
      .should('contain', 'Axel Rauschmayer')
      .should('contain', "O'Reilly Media");

    cy.get('.action-buttons')
      .click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(bookAdded);
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', 'Speaking JavaScript')
      .find('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(bookDeleted);
    });
  });
});
