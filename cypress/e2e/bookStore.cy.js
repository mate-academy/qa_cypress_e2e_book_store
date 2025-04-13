/// <reference types='cypress' />

describe('Book Store app', () => {
  const Password = 'P@ssword123';
  const UserName = 'SnTest';
  const BookName = 'Speaking JavaScript';
  const BookDescription =
  'Like it or not, JavaScript is everywhere these days-from';
  beforeEach(() => {
    cy.visit('/login');
  });

  it('Should provide an ability to log in with valid credentials', () => {
    cy.get('#userName')
      .type(UserName);

    cy.get('#password')
      .type(Password);

    cy.contains('button', 'Login')
      .click();

    cy.get('#userName-value')
      .should('contain', 'SnTest');

    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('Should provide an ability to add the book to collection', () => {
    cy.login(UserName, Password);
    cy.url().should('contain', '/profile');

    cy.get('.menu-list')
      .contains('Book Store').click();

    cy.get('#searchBox')
      .type(BookName);

    cy.get('[href="/books?book=9781449365035"]')
      .click();

    cy.get('#description-wrapper')
      .should('contain', BookDescription);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:confirm', () => true);

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('Should provide an ability to delete the book from collection', () => {
    cy.login(UserName, Password);
    cy.url().should('contain', '/profile');

    cy.get('.menu-list')
      .contains('Profile').click();

    cy.get('.rt-table')
      .should('contain', 'Speaking JavaScript');

    cy.get('#delete-record-undefined > svg')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });

    cy.get('.rt-table').should('not.contain', 'Speaking JavaScript');
  });
});
