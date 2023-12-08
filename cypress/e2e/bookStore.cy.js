/// <reference types='cypress' />
describe('Book Store app', () => {
  const testUser = {
    username: 'wojtasck',
    password: 'Wojtas1234!',
    book: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these'
  };

  it('should login user with correct test data', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(testUser.username);
    cy.get('#password')
      .type(testUser.password);
    cy.get('#login')
      .click();
    cy.url()
      .should('contain', '/profile');
    cy.get('label')
      .should('contain', testUser.username)
      .should('be.visible');
    cy.contains('#submit', 'Log out')
      .click();
  });

  it('should let logged in user add a book to their collection', () => {
    cy.login(testUser.username, testUser.password);
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store')
      .click();
    cy.get('#searchBox')
      .type(testUser.book);
    cy.contains('a', `${testUser.book}`)
      .click();
    cy.contains('#userName-value', `${testUser.description}`)
      .should('exist');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.contains('#submit', 'Log out')
      .click();
  });

  it('should let logged in user remove a book in their possesion', () => {
    cy.login(testUser.username, testUser.password);
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('[role="row"]', testUser.book)
      .get('#delete-record-undefined')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
    cy.get('#closeSmallModal-ok')
      .click();
    cy.contains('#submit', 'Log out')
      .click();
  });
});
