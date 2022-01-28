/// <reference types='cypress' />

describe('User can', () => {
  const user = {
    userName: 'KateKate',
    password: 'QAnov2021!!!'
  };

  const book = {
    title: 'Speaking JavaScript'
  };

  it('successfully log in with valid data', () => {
      cy.get('#userName-value').should('contain', user.userName);
      cy.url().should('include', '/profile');
  });

  it('go to the Store app, search for a book and add it to collection', () => {
    cy.get('#userName-value').should('contain', user.userName);
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(book.title);
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('delete the book from shopping list', () => {
    cy.get('#userName-value').should('contain', user.userName);
    cy.visit('https://demoqa.com/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });
  });
});