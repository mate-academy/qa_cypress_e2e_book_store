/// <reference types='cypress' />
/// <reference types='../support' />
describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'OlenaTest',
      password: '1234Olena!'
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
      description:'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have'
   },
    alerts: {
      bookAdded: 'Book added to your collection.',
      bookDeleted: 'Book deleted.'
  },
  };
  before(() => {
  });

  it('should provide an ability to login', () => {
    cy.visit('https://demoqa.com/login');
    cy.get('[placeholder="UserName"]')
      .type(testData.user.username)
    cy.get('[placeholder="Password"]')
      .type(testData.user.password)
    cy.contains('#login', 'Login')
      .click();
    cy.url()
      .should('include', '/profile');
    cy.get('#userName-value')
      .should('contain', testData.user.username);
  });
  
  it('should provide an ability to search a book and add to the cart', () => {
    cy.login (testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
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
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alerts.bookAdded)
      .click('{enter');
    })
    cy.contains('#item-3', 'Profile')
      .click();
    cy.get('.rt-tr-group')
      .should('contain', testData.book.name);
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
      expect(str).to.equal(testData.alerts.bookDeleted)
      .type('{enter');
        })
    })
  });
