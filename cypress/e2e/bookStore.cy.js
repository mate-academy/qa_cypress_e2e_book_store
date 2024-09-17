/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'jisov',
    password: 'Pa$$w0rd1!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };
  before(() => {
    cy.visit('/login');
  });

  it('should allow to login with valid creds', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('.btn-primary', 'Login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should allow to search for the book and add to collection', () => {
    cy.login('jisov');
    cy.visit('/books');
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
    cy.get('.menu-list').contains('Profile').click();
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should allow to delete a book from the collection', () => {
    cy.login('jisov');
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book deleted.');
    });
  });
});
