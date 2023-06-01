/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'Qatestss',
      password: 'Qaqa12345!'
    },
    book: {
      name: 'Speaking JavaScript',
      description: 'Like it or not, JavaScript'
    }
  }

  it('should allow to log in', () => {
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

  it('should allow to search a book', () => {
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
      .click();
  });

  it('should allow to delete a book', () => {
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
