/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'qasunatej',
      password: '&Meowing1',
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
      description: 'Like it or not, JavaScript is everywhere'
    },
  }; 

  before(() => {
    cy.visit('https://demoqa.com/login')
  });

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName')
    .type(testData.user.username);
    cy.findByPlaceholder('Password')
    .type(testData.user.password);
    cy.get('#login')
    .click();
    cy.get('#userName-value')
    .should('contain', testData.user.username);
    cy.url()
    .should('contain', '/profile');
  });

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');
    cy.contains('#item-2', 'Book Store')
    .click();
    cy.findByPlaceholder('Type to search')
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
    cy.wait(500);
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
