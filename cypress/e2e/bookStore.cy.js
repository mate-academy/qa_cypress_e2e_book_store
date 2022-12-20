/// <reference types='cypress' />

const { generateUser } = require("../support/generate");

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
  });

  it('should let the user login, find the book, add the book, delete the book', () => {
    const { username, password, description } = generateUser();

    //checking the page
    cy.get('.main-header')
      .should('contain', 'Login');

    //1. Login:
    cy.get('#userName')
      .type(username);

    cy.get('#password')
      .type(password);

    cy.get('#login')
      .click();

    cy.url()
      .should('include', 'profile');

    cy.get('#userName-value')
      .should('contain', username);

    //2. Navigate to Book store:
    cy.get('#gotoStore')
      .click({force: true});

    //3. Type into search field 'Speaking JavaScript'.
    cy.get('#searchBox')
      .type('Speaking JavaScript{enter}');

    //4. Click on 'Speaking JavaScript' book and assert description of the book.
    cy.get('[href="/books?book=9781449365035"]')
      .click();

    cy.contains('.form-label', description);

    //5. Click on [Add To Your Collection].
    cy.contains('.btn', 'Add To Your Collection')
      .click({force: true});
    
    //6. Confirm popup.
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.wait(3000);

    //6. Go to your profile page.
    cy.visit('/profile');

    //7. Assert 'Speaking JavaScript' in your shopping list.
    cy.get('[href="/profile?book=9781449365035"]');
  
    //8. Delete Speaking JavaScript book from your list.
    cy.get('#delete-record-undefined')
    .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
