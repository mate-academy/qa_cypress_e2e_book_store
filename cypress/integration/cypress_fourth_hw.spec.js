describe ('', () => {

  const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: "O'Reilly Media"
  }

  beforeEach(() => {
    cy.login();
  })

  it('Username should display at page when login', () => {
    cy.get('#userName-value')
      .should('contain', 'Niko');
  });

  it('User be able to find the book by name in searchbar', () => {
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.url().should('include', '/books');
    cy.get('#searchBox')
      .type('Speaking JavaScript{enter}');
    cy.get('.ReactTable')
      .should('contain', book.name, book.author, book.publisher)
    cy.contains('.rt-tr.-odd', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher);
  })

  it('User be able to add book to collection', () => {
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.contains('.action-buttons', book.name)
      .click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere');
    cy.get('#author-wrapper')
      .should('contain', book.author);
    cy.get('#publisher-wrapper')
      .should('contain', book.publisher);
    cy.get('#pages-wrapper')
      .should('contain', '460');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
        .click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book already present in the your collection!`)
    })
  })

  it('User be able to delete book from collection', () => {
    cy.contains('#item-3', 'Profile')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.contains('.rt-tr.-odd', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher)
      .find('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.contains(book.author, book.name, book.publisher)
      .should('not.exist');
  })
})
