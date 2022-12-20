/// <reference types='cypress' />

const user = {
name: 'Den',
password: 'Password1!'
};

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/books')
  });

  it('should allow user to login with registered creds', () => {
    cy.contains('.left-pannel', 'Book Store Application').contains('Login').click();
    cy.get('#userName').type(user.name);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    /*- assert your username after login username;*/    
    cy.get('#userName-value').should('contain.text', user.name);
    /*- asser new url;*/
    cy.url().should('equal', 'https://demoqa.com/profile')
  });

  it('should allow user to add a book to collection', () => {
    cy.login();
    /*Navigate to `Book store`.*/
    cy.contains('.left-pannel', 'Book Store Application').contains('Book Store').click();
    /*Type into search field 'Speaking JavaScript'.*/
    cy.get('#searchBox').type('Speaking JavaScript');
    /*Click on 'Speaking JavaScript' book.*/
    cy.contains('a', 'Speaking JavaScript').click();
    /*- assert description of the book.*/
    cy.get('#description-wrapper').should('contain.text', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer');
    /*Click on [Add To Your Collection].*/
    cy.contains('button', 'Add To Your Collection').click({force: true});
    /*Confirm popup. You can do it with cy.on():*/
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
    /*Deleting added books in collection at the end of test*/
    cy.contains('.left-pannel', 'Book Store Application').contains('Profile').click();
    cy.get('a').should('contain', 'Speaking JavaScript');
    cy.contains('button', 'Delete All Books').click({force: true});
    cy.contains('#closeSmallModal-ok', 'OK').click();
    cy.get('#closeSmallModal-ok').click();
  });

  it('should allow user to delete a book from collection', () => {
    cy.login();
    /*Navigate to `Book store`.*/
    cy.contains('.left-pannel', 'Book Store Application').contains('Book Store').click();
    /*Type into search field 'Speaking JavaScript'.*/
    cy.get('#searchBox').type('Speaking JavaScript');
    /*Click on 'Speaking JavaScript' book.*/
    cy.contains('a', 'Speaking JavaScript').click();
    cy.contains('button', 'Add To Your Collection').click({force: true});
    /*Confirm popup. You can do it with cy.on():*/
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    /*Go to your profile page.*/
    cy.contains('.left-pannel', 'Book Store Application').contains('Profile').click();
    /*Assert 'Speaking JavaScript' in your shopping list.*/
    cy.get('a').should('contain', 'Speaking JavaScript');
    /*Delete Speaking JavaScript book from your list.*/
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
