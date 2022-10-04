/// <reference types='cypress' />

describe('User should be able', () => {
  const user = {
    username:"Masha",
    password: "12345Zxcvb!"
  };

  const book = {
    name: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media"
  };

  it('to login with registered Username & Password', () => {
        cy.get('#userName-value').should('contain', user.username);
  });

  it('to add book to the collection', () => {
    cy.contains('#item-2', 'Book Store').click();
    cy.get('#searchBox').type(book.name).should('have.value', book.name);
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.contains('#item-3', 'Profile').click();
    cy.contains('.rt-tr.-odd', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('to delete book from the collection', () => {
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
    cy.get('[class="ReactTable -striped -highlight"]').should('not.contain', book.name);
  });
});