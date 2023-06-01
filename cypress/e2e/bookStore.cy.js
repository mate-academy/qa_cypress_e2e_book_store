/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'Irynatestqa',
      password: 'Qwert123!',
    },
    book: {
      title: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: "O'Reilly Media",
      description: 'Like it or not, JavaScript is everywhere ',
    },
    alert: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.',
    },
  };

  beforeEach(() => {
    cy.visit('/login');
  });

  it('user should be able to login', () => {
    cy.findPlaceholder('UserName')
      .type(testData.user.username);
    cy.findPlaceholder('Password')
      .type(testData.user.password);
    cy.get('#login').click();
    cy.get('#userName-value')
      .should('contain', testData.user.username);
    cy.url()
      .should('include', '/profile');
  });

  it('should provide an ability to search for the book and add to cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testData.book.title);
    cy.get('[role="row"]')
      .should('contain', testData.book.title)
      .should('contain', testData.book.author)
      .should('contain', testData.book.publisher);
    cy.contains('a', testData.book.title)
      .click();
    cy.get('#description-wrapper')
      .should('contain', testData.book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookAdded);
    });
  });

  it('should provide an ability to delete a book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.contains('#item-3', 'Profile').click();
    cy.contains('[role="row"]', testData.book.title)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookDeleted);
    });
  });

});