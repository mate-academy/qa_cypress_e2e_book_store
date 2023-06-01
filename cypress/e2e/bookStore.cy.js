/// <reference types='cypress' />

const testData = {
    user: {
      username: 'peppapig',
      password: 'peppaPig123!'
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
    cy.visit('https://demoqa.com/login');
  });

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName')
      .type(testData.user.username);

    cy.findByPlaceholder('Password')
      .type(testData.user.password);

    cy.contains('#login', 'Login')
      .click();

    cy.url()
      .should('include', 'https://demoqa.com/profile');
  
    cy.get('#userName-value')
      .should('contain', testData.user.username);
  }); 

  it('should provide an ability to search a book and add to the cart', () => {
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
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alerts.bookAdded)
      .click('{enter');
    })

    cy.contains('#item-3', 'Profile')
      .click();
     
    cy.get('.rt-tr-group')
      .should('contain', testData.book.name);
  })

  it('should provide an ability to delete a book from cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');

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

