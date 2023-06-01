/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData =  {
    user:{
      username: 'Adam',
      password: '12345Qwert!'
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
      description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you,'
    },
  };

  before(() => {
    cy.visit('/login');
  });

  it('Should provide an ability to log in', () => {
    cy.findPlaceholder('UserName')
      .type(testData.user.username);
    cy.findPlaceholder('Password')
      .type(testData.user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', testData.user.username)
    cy.url()
      .should('include', '/profile')
  });

  it('Should provide an ability to search for the book and add to cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
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
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });

  it('user should be able to delete book from shopping list', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile').click();
    cy.contains('[role="row"]', testData.book.name)
      .find('[title="Delete"]')
      .click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(testData.alert.bookDeleted);
    });
  });
});
