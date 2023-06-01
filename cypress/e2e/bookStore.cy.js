/// <reference types='cypress' />

const testData = {
  user: {
    username: 'allay',
    password: 'Allay!@12'
  },
  book: {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: "O'Reilly Media",
    description: 'Like it or not, JavaScript is everywhere'
  },
  alerts: {
    bookAdded: 'Book added to your collection.',
    bookDeleted: 'Book deleted.',
  },
};

describe('Book Store app', () => {

  before(() => {

    cy.visit('/login');
  });

  it('should provide an ability to login for registered user', () => {

    cy.get('#userName').type(testData.user.username);

    cy.get('#password').type(testData.user.password);

    cy.get('#login').click();

    cy.get('#userName-value').should('contain', testData.user.username);

    cy.url().should('include', '/profile');
});

  it('should provide an ability to search for the book and add it to the cart', () => {

    cy.login(testData.user.username, testData.user.password);

    cy.visit('/profile')

    cy.contains('#item-2', 'Book Store').click();
    
    cy.get('#searchBox').type(testData.book.title);
    
    cy.get('[role="row"]')
      .should('contain', testData.book.title)
      .and('contain', testData.book.title)
      .and('contain', testData.book.title);
    
    cy.contains('a', testData.book.title).click();

    cy.get('#description-wrapper').should('contain', testData.book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();

    cy.on('window:alert', (str) => {
       expect(str).to.equal(testData.alerts.bookAdded)
    });
  }); 

  it('should provide an ability to delete the book from the cart', () => {

    cy.login(testData.user.username, testData.user.password);

    cy.visit('/profile');

    cy.contains('#item-3', 'Profile').click();

    cy.contains('[role="row"]', testData.book.title)
      .find('[title="Delete"]')
      .click();

    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
       expect(str).to.equal(testData.alerts.bookDeleted);
    });
  });
});
