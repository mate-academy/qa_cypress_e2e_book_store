/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'Tester123',
      password: 'Password12345!'
    },
    book: {
      name: 'Speaking JavaScript',
      description: 'Like it or not, JavaScript'
    }
  }

  it('should provide an ability to login', () => {
    cy.visit('https://demoqa.com/login');
    cy.get('#userName')
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

  it('should provide an ability to search for a book and add to the cart', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testData.book.name);
    cy.contains('a', testData.book.name)
      .click();
    cy.contains('.form-label', testData.book.description)
      .should('exist');
    cy.contains('button', 'Add To Your Collection')
      .click({ force: true });
    
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
  });
});
