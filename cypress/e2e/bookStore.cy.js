/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'danny_qa23',
    password: 'Qwer1234!'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere '
  };

  it('should provide the ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should provide the ability to search book and add', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.get('a').contains(book.title).click();

    cy.get('#author-wrapper').should('contain', book.author);
    cy.get('#publisher-wrapper').should('contain', book.publisher);
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(500);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide the ability to delete book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('.mr-2').should('contain', book.title);

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);
    cy.get('a').contains(book.title).click();

    cy.get('.text-right').should('contain',
      'Add To Your Collection');
  });
});
