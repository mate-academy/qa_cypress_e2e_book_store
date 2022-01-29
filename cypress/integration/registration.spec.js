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

  it('go to the Store app, search for a book, add it to collection and then delete', () => {
    cy.get('#userName-value').should('contain', user.userName);
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(book.title);
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.visit('https://demoqa.com/profile');
    cy.get('.rt-tr.-odd').should('contain', book.title);
    cy.get('#delete-record-undefined > svg > path').click();
    cy.get('#closeSmallModal-ok').click();
    cy.visit('https://demoqa.com/profile');
    cy.contains(book.title).should('not.exist');
  });
});