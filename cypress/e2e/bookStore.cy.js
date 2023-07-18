/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'JonJon',
    password: 'Pa$$word1'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should allow to login', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);

    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
  });

  it('should allow to add a book to the user collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type(book.title);
    cy.contains('a', book.title).click();
    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('#publisher-wrapper').should('contain', book.publisher);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should allow to delete a book from the user collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
