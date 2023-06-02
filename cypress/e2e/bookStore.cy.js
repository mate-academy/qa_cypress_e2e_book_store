/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'YuliiaPyrih',
      password: 'Mate1234!',
    },
    book: 'Speaking JavaScript',
  };

  before(() => {
  });

  it('should provide an ability to login', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(testData.user.username);
    cy.get('#password')
      .type(testData.user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', testData.user.username);
    cy.url()
      .should('include', '/profile');
  });

  it('should provide an ability to add a book to cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/books');

    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testData.book);
    cy.contains(testData.book)
      .click();
    cy.contains('#description-wrapper')
      .should('not.be.empty');
    cy.contains('Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');

    cy.contains('#item-3', 'Profile')
      .click();
    cy.get('[role="row"]')
      .should('contain', testData.book);
    cy.contains('[role="row"]', testData.book)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });
  });
});
