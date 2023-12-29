/// <reference types='cypress' />

beforeEach(() => {
  cy.visit('/login');
});

describe('Book Store app', () => {
  const user = {
    username: 'Yurii99',
    password: 'Qwer1234!'
  }

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days'
  }

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();

    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to search the book and add it to the collection', () => {
    cy.login();
    cy.get('.menu-list').contains('Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.title);

    cy.contains('[role="row"]', book.title)
    .should('contain', book.author)
    .and('contain', book.publisher);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`);
    });

    cy.get('.menu-list').contains('Profile').click();
    cy.contains('[role="row"]', book.title)
    .should('contain', book.author)
    .and('contain', book.publisher);

  });

    it("should allow to delete the book from the user's list", () => {
      cy.login();
      cy.get('.menu-list').contains('Profile').click();
      cy.get('#delete-record-undefined').click();
      cy.get('#closeSmallModal-ok').click();
      cy.on('window:alert', (alert) => {
        expect(alert).to.equal(`Book deleted.`);
      });
    });
});

