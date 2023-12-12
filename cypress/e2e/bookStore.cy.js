/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'antkiew',
    password: 'Testing123!',
  }
  const book = {
    title: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days-from browser',
    isbn: '9781449365035',
  }
it("should add book to the user's profile", () => {
  //Loging by a request
  cy.visit('/login');
  cy.login(user);
  cy.visit('profile');
  // Loging assertions
  cy.get('label').contains(user.username).should('be.visible');
  cy.get('button').contains('Log out').should('be.visible');
  cy.url().should('contain', '/profile');
  //Go to the Books content
  cy.get('.menu-list').contains('Book Store').click();
  cy.url().should('contain', '/books');
  //Find the book
  cy.get('[placeholder="Type to search"]').type(book.title);
  cy.get('a').contains(book.title).click();
  cy.get('.form-label').should('contain.text', book.description)
  //Add the book to the cellection
  cy.get('.text-right.fullButton').contains('Add To Your Collection').click();
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
})
});

it('should go to the profile page and delete the book', () => {
  //Loging by a request
  cy.visit('/login');
  cy.login(user);
  //Delete book from the collection
  cy.visit('/profile');
  cy.get('a').contains(book.title).should('exist');  
  cy.get('#delete-record-undefined').click();
  cy.get('button#closeSmallModal-ok').contains('OK').click();
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book deleted.`)
  });
  });
});