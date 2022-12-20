/// <reference types='cypress' />

const { cell_phone } = require("faker/lib/locales/ar");
const { generateUser } = require("../support/generate");

describe('Book Store app', () => {
  before(() => {
    cy.visit('/')
  });

  it('should let the user register', () => {
    const { username, password } = generateUser();

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
      .type('Speaking JavaScript').type('{enter}');

    //4. Click on 'Speaking JavaScript' book and assert description of the book.
    cy.get('[href="/books?book=9781449365035"]')
      .click();

    cy.contains('.form-label', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')

    cy.url()
      .should('include', '9781449365035');

    //5. Click on [Add To Your Collection].
    cy.contains('.btn', 'Add To Your Collection')
      .click({force: true});

    //6. Confirm popup.
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    //6. Go to your profile page.
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3')
      .click();

    //7. Assert 'Speaking JavaScript' in your shopping list.
    cy.get('[href="/profile?book=9781449365035"]');
  
    //8. Delete Speaking JavaScript book from your list.
    cy.get('#delete-record-undefined').
      click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
