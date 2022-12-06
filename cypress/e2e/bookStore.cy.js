const userName = 'Super_Admin';
const password = 'P@ssw0rd'

describe('Book Store app, login via UI', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should provide ability to login via UI', () => {
    cy.get('#userName')
        .type(userName);

    cy.get('#password')
        .type(password);

    cy.get('#login')
        .click();

    cy.checkIsUserLoggedIn(userName);
  });
});

describe('Book Store app, add and delete book', () => {
  beforeEach(() => {
    cy.loginRequest(userName, password);
  });

  it('should be possible to add book to collection', function() {
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
      .click();

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.get('[href="/books?book=9781449365035"]')
      .click();

    cy.scrollTo('bottom');

    cy.get('#description-wrapper > .col-md-9')
      .should('contain.text', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')

    cy.get('.text-right > #addNewRecordButton')
      .click();

    cy.visit('/profile');

    cy.get('[href="/profile?book=9781449365035"]')
      .should('contain.text', 'Speaking JavaScript')
  });

  it('should be possible to delete book from collection', function() {
    cy.get('#delete-record-undefined')
      .click();

    cy.on('window:confirm', (str) => {
      expect(str).to.equal(`Delete Book`)
    })

    cy.get('#closeSmallModal-ok').click();

    cy.get('[href="/books?book=9781449365035"]')
      .should('not.exist');
  });
})
