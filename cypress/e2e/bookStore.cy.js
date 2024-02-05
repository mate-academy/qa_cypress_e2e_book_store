/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'anastasiiaYa',
    password: 'Password1!'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere these days'

  };
  before(() => {
  });

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should navigate to Book store and' +
      'search for the book then add it to colection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author);
    cy.get('a').contains(book.title).click();
    cy.get('#title-wrapper')
      .should('contain', book.title);
    cy.get('#author-wrapper')
      .should('contain', book.author);
    cy.get('#description-wrapper')
      .should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`);
    });
  });

  it('should allow to delete the book from collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book deleted.`);
    });
  });
});
