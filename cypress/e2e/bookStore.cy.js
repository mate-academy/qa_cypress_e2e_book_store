/// <reference types='cypress' />

const user = {
  userName: 'AlbusDumbledore',
  password: 'Patronus1!'
};

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow user to login', () => {
    cy.get('#userName')
      .type(user.userName);
    cy.get('#password')
      .type(user.password);
    cy.contains('#login', 'Login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.userName);
    cy.url()
      .should('equal', Cypress.config().baseUrl + '/profile');
  });

  it('should allow user to add the book', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('.text', 'Book Store')
      .click({force: true});
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.get('#basic-addon2')
      .click();
    cy.contains('a', 'Speaking JavaScript')
      .click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.get('.text-right > #addNewRecordButton')
      .click({force:true});
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.contains('.text', 'Profile')
      .click({force:true});
    cy.get('a')
      .should('contain', 'Speaking JavaScript');
  });

  it('should allow user to delete the book', () => {
    cy.login();
    cy.visit('/profile');
    cy.addBook();
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
  });
});
