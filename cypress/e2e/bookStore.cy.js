/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'testuser003',
    password: 'Qwer123#'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should allow to login, add a book and delete a book', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');

    cy.get('#gotoStore').click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains('a', book.title).click();

    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('button', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    cy.contains('.text', 'Profile').click();

    cy.get('a').should('contain', book.title);
    cy.contains('.rt-td', book.author).should('be.visible');

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
