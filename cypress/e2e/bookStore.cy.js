/// <reference types='cypress' />

describe('Book Store app', () => {
  const bookurl = 'https://demoqa.com/login';
  beforeEach(() => {
    cy.visit(bookurl);
  });

  it('the user is login to the book store', () => {
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.url().should('contain', 'profile');
    cy.get('[id="userName-value"]').should('contain', 'geqod');
  });

  it('the user is logged in and navigate to the book store', () => {
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.get('[id="item-2"]').contains('Book Store').click();
    cy.get('[id="searchBox"]').type('Speaking JavaScript');
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.url().should('contain', 'book=9781449365035');
    cy.get('[class="col-md-9 col-sm-12"]')
      .should('contain', 'Speaking JavaScript');
    cy.get('[class="form-label"]').should('contain', 'Description : ');
  });
  it('the logged in user is add the book to the cart', () => {
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.url().should('contain', 'profile');
    cy.get('[id="userName-value"]').should('contain', 'geqod');
    cy.get('[id="item-2"]').contains('Book Store').click();
    cy.get('[id="searchBox"]').type('Speaking JavaScript');
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.get('[class="text-right fullButton"]')
      .contains('Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.get('[id="submit"]').click();
  });
  it('Assert that the book in the user shopping list', () => {
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.url().should('contain', 'profile');
    cy.get('[id="userName-value"]').should('contain', 'geqod');
    cy.get('[id="item-2"]').contains('Book Store').click();
    cy.get('[id="searchBox"]').type('Speaking JavaScript');
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.get('[class="text-right fullButton"]')
      .contains('Add To Your Collection')
      .click();
    cy.get('[class="btn btn-primary"]').contains('Log out').click();
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.get('[id="see-book-Speaking JavaScript"]').should('exist');
  });
  it('Delete the book from the shopping list', () => {
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.url().should('contain', 'profile');
    cy.get('[id="userName-value"]').should('contain', 'geqod');
    cy.get('[id="item-2"]').contains('Book Store').click();
    cy.get('[id="searchBox"]').type('Speaking JavaScript');
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.get('[class="text-right fullButton"]')
      .contains('Add To Your Collection')
      .click();
    cy.get('[id="submit"]').click();
    cy.get('[placeholder="UserName"]').type('geqod');
    cy.get('[placeholder="Password"]').type('Pa$$w0rd!');
    cy.get('[class="btn btn-primary"]').contains('Login').click();
    cy.get('[id="delete-record-undefined"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();
  });
});
