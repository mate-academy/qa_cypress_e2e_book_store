/// <reference types='cypress' />
/// <reference types='../support' />

describe('Book Store app', () => {
  const testData ={
    user: {
      username: 'Ivan',
      password: '!2345Qwerty'
    },
    book: {
      name: 'Git Pocket Guide',
      author: 'Richard E. Silverman',
      publisher: 'O\'Reilly Media',
      description: 'This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp'
    },
    alerts: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.'
    },
  };

  before(() => {
    cy.visit('/login');
  });

  it('Should provide an ability to log in', () => {
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

  it('Should provide an ability to search for the book and add to the collection', () => {
    cy.login(testData.user.username, testData.user.password);
    
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('[placeholder="Type to search"]')
      .type(testData.book.name);
    cy.contains('[role="row"]', testData.book.name)
      .should('contain', testData.book.author)
      .and('contain', testData.book.publisher);
    cy.contains('a', testData.book.name)
      .click();
    cy.get('#description-wrapper')
      .should('contain', testData.book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) => (
      expect(alert).to.eq(testData.alerts.bookAdded)
    ));
  });

  it('Should provide an ability to search for the book and add to the collection', () => {
    cy.login(testData.user.username, testData.user.password);
    
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => (
      expect(alert).to.eq(testData.alerts.bookDeleted)
    ));
  });
});
