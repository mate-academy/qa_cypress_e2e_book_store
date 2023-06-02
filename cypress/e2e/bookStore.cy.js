/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'userYK',
      password: 'Qwert12345!'
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
      description: 'Like it or not, JavaScript is everywhere'
    },
    alerts: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.'
    }
  };

  before(() => {
    cy.visit('/');
  });

  it('should allow existed user to login', () => {
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

  it('should provide an ability to search a book and add it to the cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testData.book.name);
    cy.contains('[role="row"]', testData.book.name)
      .should('contain', testData.book.author)
      .and('contain', testData.book.publisher);
    cy.contains('[class="action-buttons"]', testData.book.name)
      .click();
    cy.get('#description-wrapper')
      .should('contain', testData.book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alerts.bookAdded);
    })
  });

  it('should provide an ability to delete book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', testData.book.name)
      .should('contain', testData.book.author)
      .and('contain', testData.book.publisher);
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alerts.bookDeleted);
    });
  });
});

