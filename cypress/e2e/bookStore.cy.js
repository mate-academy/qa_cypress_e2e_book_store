/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'latoqub',
    password: 'Qwer1234!'
  };
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'

  };

  it(' log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to serch for the book and add', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);

    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    // cy.get('#addNewRecordButton').contains('Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });
  it('Delete ', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('.action-buttons').should('contain', book.title);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content')
      .should('contain', 'Do you want to delete this book?');
    // cy.contains('.ReactTable', book.title).should('not.exist');
  });
});
