/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'bobbytester',
    password: 'Qwerty123456!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from'
  };

  it('log in, add a book, and delete a book should be successful', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');
    cy.get('#gotoStore').click();
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('#item-3 .text').contains('Profile').click();
    cy.get('.ReactTable').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
    cy.reload();
    cy.get('.ReactTable').should('not.contain', 'Speaking JavaScript');
  });
});
