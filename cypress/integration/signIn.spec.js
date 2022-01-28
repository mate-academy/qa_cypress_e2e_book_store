/// <reference types='cypress' />

describe('User can', () => {
  const user = {
    username: "QA_Katy",
    password: "123QAnov21!"
  };

  const book = {
    title: "Speaking JavaScript",
    author: "Axel Rauschmayer",
    publisher: "O'Reilly Media"
  };

  const book2 = {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    publisher: "O'Reilly Media"
  };


  it('successfully login', () => {
    cy.get('#userName-value').should('contain', user.username)
  });

  it('search for book', () => {
    cy.visit('books');
    cy.get('#searchBox').type(book.title);
    cy.contains('.rt-tr.-odd', book.title)
    .should('contain', book.author)
    .and('contain', book.publisher);
    cy.get('[id$="Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.visit('profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click('center');
  });

  it(`delete book from user's shopping list`, () => {
    cy.visit('books');
    cy.get('#searchBox').type(book2.title);
    cy.contains('.rt-tr.-odd', book2.title)
    .should('contain', book2.author)
    .and('contain', book2.publisher);
    cy.get(`[id$="You Don't Know JS"]`).click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.visit('profile');
    cy.contains('.rt-tr.-odd', book2.title)
    .should('contain', book2.author)
    .and('contain', book2.publisher);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click('center');
    cy.contains(book2.title)
      .should('not.exist');
  });
});