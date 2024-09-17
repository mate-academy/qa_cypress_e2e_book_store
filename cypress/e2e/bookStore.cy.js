/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'lnk123456789',
    password: 'lnk123456789A!'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    description: 'Like it or not, JavaScript is everywhere'
  };
  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.userName);
  });
  it('should allow to serch book by it`s title and add to collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author);

    cy.get('a').contains(book.title).click();
    cy.contains('.form-label', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should allow to delete the book from the list', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author);

    cy.get('a').contains(book.title).click();
    cy.contains('.form-label', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.contains('.text', 'Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
