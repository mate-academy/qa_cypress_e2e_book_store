/// <reference types='cypress' />

const testData = {
  user: {
    username: 'AnnaTsk02',
    password: 'hEllo123#'
  },
  book: {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
  },
  alerts: {
    bookAdded: 'Book added to your collection.',
    bookDeleted: 'Book deleted.'
  }
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should let log in', () => {
    cy.get('[placeholder="UserName"]')
      .type(testData.user.username); 
    cy.get('[placeholder="Password"]')
      .type(testData.user.password); 
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', testData.user.username); 
    cy.url()
      .should('include', '/profile');
  });

  it('should let search for book and add it to cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox').type(testData.book.name);
    cy.get('[role="row"]')
      .should('contain', testData.book.name)
      .should('contain', testData.book.author)
      .should('contain', testData.book.publisher);
    cy.contains('a', testData.book.name).click();
    cy.get('#description-wrapper')
      .should('contain', testData.book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookAdded);
    });
  });

  it('user let delete a book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile').click();
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      console.log(str)
      expect(str).to.equal(testData.alert.bookDeleted);
    });
  });
});
