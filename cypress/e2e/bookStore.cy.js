Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
  });

describe('Book Store app', () => {
    const user = {
      username: 'aneta772',
      password: 'Password123!',
    };

    const book = {
      title: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: '',
      description: 'Like it or not, JavaScript is everywhere these days'
    };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
   });
  
  it('should allow to search for the book and add it to the collection', () => {
    cy.login();
    cy.visit('/books');
    cy.get('#searchBox').type(book.title);

    cy.contains('[role="row"]', book.title)
    .should('contain', book.author)
    .and('contain', book.publisher);

    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
})
  
  it('should delete the book from the collection', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
