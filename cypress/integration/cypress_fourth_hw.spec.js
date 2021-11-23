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
      .should('contain', book.name, book.author, book.publisher);
  });

  it('User be able to add the book to collection', () => {

  })
})
