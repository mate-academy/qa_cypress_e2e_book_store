/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'DianaDi',
    password: 'DianaDi123!'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Alex Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript'
  };
  before(() => {
  });

  it('susscess loged in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', 'DianaDi');
  });

  it('should allow to search for the book and add to colection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.publisher);
    cy.get('a').contains(book.title).click();
    cy.get('#title-wrapper')
      .should('contain', book.title);
    cy.get('#publisher-wrapper')
      .should('contain', book.publisher);
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
      .should('contain', book.publisher);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book deleted.`);
    });
    cy.contains('.ReactTable', book.title).should('not.exist');
  });
});
