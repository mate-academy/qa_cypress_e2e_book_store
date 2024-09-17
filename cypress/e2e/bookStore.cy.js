/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.viewport(2200, 1380);
    cy.visit('/login');
  });

  const user = {
    userName: 'QA',
    password: 'Qaqaqa11!'
  };

  const book = {
    title: 'Understanding ECMAScript 6',
    author: 'Nicholas C. Zakas',
    publisher: 'No Starch Press',
    description: 'ECMAScript 6 represents the biggest update to the core'
  };

  const alertMessage = {
    added: 'Book added to your collection.',
    deleted: 'Book deleted.'
  };

  it('should provide an ability to login with valid credentials', () => {
    cy.get('#userName')
      .type(user.userName);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.userName);
    cy.url()
      .should('include', '/profile');
  });

  it('should provide an ability to search a book and add to cart', () => {
    cy.login(user.userName, user.password);
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('.rt-tr.-odd', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('[href="/books?book=9781593277574"]')
      .click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal.apply(alertMessage.added);
    });
  });

  it('should provide an ability to delete book from the cart', () => {
    cy.login(user.userName, user.password);
    cy.get('.menu-list').contains('Profile')
      .click();
    cy.get('[href="/profile?book=9781593277574"]')
      .should('contain', book.title);
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal.apply(alertMessage.deleted);
    });
  });
});
