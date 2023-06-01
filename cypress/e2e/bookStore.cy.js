/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'Adam',
      password: '12345Qwert!'
    },

    book:{
      name: 'Git Pocket Guide',
      author: 'Richard E. Silverman',
      publisher: "O'Reilly Media",
      description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system.'
    },

    alerts: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.'
    }
  };

  beforeEach(() => {
    cy.viewport(1080, 1280);
    cy.visit('https://demoqa.com/login');
  });

  it('should allow existed user to login', () => {
    cy.findByPlaceholder('UserName')
      .type(testData.user.username)

    cy.findByPlaceholder('Password')
      .type(testData.user.password)

    cy.get('#login')
      .click()

    cy.get('#userName-value')
      .should('contain', testData.user.username)

    cy.url()
      .should('include', '/profile')
  });

  it('should provide an ability to search a book and add it to the cart', () => {
    cy.login(testData.user.username, testData.user.password)

    cy.contains('#item-2', 'Book Store')
      .click()

    cy.findByPlaceholder('Type to search')
      .type(testData.book.name)

    cy.contains('[role="row"]', testData.book.name)
      .should('contain', testData.book.author)
      .and('contain', testData.book.publisher)

    cy.contains('a', testData.book.name)
      .click()

    cy.get('#description-wrapper')
      .should('contain', testData.book.description)

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click()

    cy.on('window:alert', (alert) => {
      expect(alert).to.eql(testData.alerts.bookAdded)
    })
  });

  it('should provide an ability to delete book from cart', () => {
    cy.login(testData.user.username, testData.user.password)

    cy.contains('#item-3', 'Profile')
      .click()

    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click()

    cy.get('#closeSmallModal-ok')
      .click()

    cy.on('window:alert', (alert) => {
      expect(alert).to.eql(testData.alerts.bookDeleted)
    });
  });
});
