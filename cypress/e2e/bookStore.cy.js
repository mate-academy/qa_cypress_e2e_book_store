/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1920, 1080);
  });

  const username = 'kusedo';
  const password = 'Pa$$w0rd!';
  const bookName = 'Speaking JavaScript';

  it('successful login', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', username);
  });

  it('adding the book', () => {
    cy.login(username, password);
    cy.visit('https://demoqa.com/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(bookName);
    cy.contains(bookName).click();

    cy.url().should('include', '/book');
    cy.get('#description-label').should('contain', 'Description');

    cy.contains('Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it('deletion of the added book', () => {
    cy.login(username, password);
    cy.contains('#item-3', 'Profile').click();
    cy.contains(bookName).should('contain', bookName);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
