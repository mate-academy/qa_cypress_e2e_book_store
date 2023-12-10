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

  it('should login user with valid data', () => {
    //Log in
    cy.visit('/login');
    cy.get('[placeholder="UserName"]').type(user.username);
    cy.get('[placeholder="Password"]').type(user.password);
    cy.get('button').contains('Login').click(); 
    // Loging assertions
    cy.get('label').contains(user.username).should('be.visible');
    cy.get('button').contains('Log out').should('be.visible');
    cy.url().should('contain', '/profile');
  });

  it.only("should add book to the user's profile", () => {
    //Login request
    cy.visit('/login');
    cy.login(user);
    //Go to the Books content
    cy.get('.menu-list').contains('Book Store').click();
    cy.url().should('contain', '/books');
    //Find the book
    cy.get('[placeholder="Type to search"]').type(book.title);
    cy.get('a').contains(book.title).click();
    cy.get('.form-label').should('contain.text', book.description)
    //Add the book to the cellection
    cy.get('.text-right.fullButton').contains('Add To Your Collection').click();
    cy.on('window:alert', (txt) => {
      expect(txt).to.equal('Book added to your collection.');
    })
    //Profile page
    cy.visit('/profile');
    cy.get('a').contains(book.title).should('exist');  
    //Delete the book from collection (Can't be added twice)
    cy.deleteBook('9781449365035'); 

 })
});
