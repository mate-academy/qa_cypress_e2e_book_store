/// <reference types='cypress' />

describe('User should be able', () => {
  const user = {
    userName: 'fourthCypress',
    password: 'Qwerty@123'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media'
  }

  it('to login using existing data', () => {
    cy.get('#userName-value').should('contain', user.userName);

  });

  it('to find book', () => {
    cy.contains('#item-2', 'Book Store')
    .should('contain', 'Book Store').click();
    cy.get('#searchBox').type(book.title).should('have.value', book.title);
    cy.contains('.rt-tr.-odd', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
       expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('to delete book', () => {
    cy.visit('/profile');
    cy.get('#searchBox').type(book.title).should('have.value', book.title);
    cy.contains('.rt-tr.-odd', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.contains('.rt-tbody',book.title).should('not.exist');
  });

});