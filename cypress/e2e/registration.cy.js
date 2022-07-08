/// <reference types='cypress' />

describe('User should', () => {

  const user = {
    username: 'Cy_test',
    password: 'Cy_test123@',
  };
  const bookInfo = {
    bookName: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description:'Like it or not, JavaScript is everywhere these days-from',
  };

  beforeEach(() => {
    cy.login(user.username, user.password);
  });

  it('login successfully', () => {
    cy.url()
    .should('contain', '/profile');

    cy.get('#userName-value')
    .should('have.text', user.username);
  });

  it('go to the bookstore and search the book', () => {
    cy.get('#gotoStore')
    .click();

    cy.get('#searchBox')
    .type(bookInfo.bookName);

    cy.contains('a', bookInfo.bookName)
    .click();

    cy.contains('.books-wrapper', bookInfo.bookName)
    .should('contain', bookInfo.author)
    .and('contain', bookInfo.publisher);

    cy.get('#description-wrapper')
    .should('contain', bookInfo.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.')
    });

    cy.visit('/profile');

    cy.get('[class="rt-tbody"]')
    .should('contain.text', bookInfo.bookName);
  });

  it('delete the selected book from the account', () => {
    
    cy.get('[class="rt-tbody"]')
    .should('contain.text', bookInfo.bookName);

    cy.get('#delete-record-undefined')
    .click();

    cy.get('#closeSmallModal-ok')
    .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book deleted.');
    });

    cy.contains('a', bookInfo.bookName)
    .not();
  });
});