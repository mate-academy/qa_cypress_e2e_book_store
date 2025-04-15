/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    userName: 'mygadabls',
    password: 'Ewr1!111'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  };

  before(() => {
  });

  it('should be able to log in', () => {
    cy.visit('/login');
    cy.get('#userName-wrapper').type(user.userName);
    cy.get('#password-wrapper').type(user.password);
    cy.get('#login').click();

    cy.get('#userName-value', { timeout: 10000 })
      .should('be.visible').and('contain', user.userName);

    cy.url({ timeout: 10000 }).should('include', '/profile');
    cy.url().should('eq', 'https://demoqa.com/profile');
  });

  it('should allow to search for the book and add to collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.get('[id="see-book-Speaking JavaScript"]').click();

    cy.get('#description-wrapper').should('contain', book.description);

    cy.get('[class="text-right fullButton"]').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    cy.contains('.text', 'Profile').click();

    cy.contains('.ReactTable', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should allow to delete the book from collection', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('.ReactTable', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);

    cy.get('#delete-record-undefined').click();

    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content')
      .should('contain', 'Do you want to delete this book?');

    cy.get('#closeSmallModal-ok').click();

    cy.contains('.ReactTable', book.title).should('not.exist');
  });
});
