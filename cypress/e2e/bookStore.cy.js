/// <reference types='cypress' />
const testData = {
  user: {
    username: 'tester',
    password: 'Tester12345@'
  },
  book: {
    name: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days'
  },
  alert: {
    alert: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.',
    },
  }
}

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should provide an ability to log in', () => {
    cy.findPlaceholder('UserName')
      .type(testData.user.username);
    cy.findPlaceholder('Password')
      .type(testData.user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', testData.user.username);
    cy.url()
      .should('include', '/profile');
  });
  it('should provide an ability to search for the book and add to the cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testData.book.name);
    cy.contains('a', testData.book.name).click();
    cy.get('#description-wrapper')
      .should('contain', testData.book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookAdded);
    });
  });
  it('should provide an ability to delete the book from the cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookDeleted);
    });
  });
});
