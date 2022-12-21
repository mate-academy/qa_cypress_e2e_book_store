/// <reference types='cypress' />

//const { contains } = require("cypress/types/jquery");

describe('Book Store app', () => {
  const user = {
    username: 'Malika',
    password: 'Malika123!'
  }
  before(() => {
  cy.visit('/login');
  });

  it('should login with registered credentials', () => {
  cy.get('#userName')
    .type(user.username);
  cy.get('#password')
    .type(user.password);
  cy.get('#login').click();

  cy.url()
    .should('include', '/profile');
  });

  it('check for log in', () => {
  cy.login();
  cy.visit('/profile');
  cy.get('#userName-value')
    .should('contain', 'Malika');
  });

  it('add a book to the bookmark', () => {
    cy.login();
    cy.visit('/profile');
    cy.contains('.text', 'Book Store')
    .click()
    cy.get('#searchBox')
      .type('Speaking');
    cy.get('[id="see-book-Speaking JavaScript"]')
      .click()
    cy.get('#description-wrapper')
        .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')
    cy.get('.text-right > #addNewRecordButton')
        .click({ force: true });
    cy.on('window:alert', (str) => {
          expect(str).to.equal(`Book added to your collection.`)
    });
  });

    it('delete a book', () => {
      cy.login();
      cy.visit('/profile');
      cy.contains('.text', 'Profile')
            .click()
      cy.get('#delete-record-undefined')
            .click();
      cy.get('#closeSmallModal-ok')
            .click();
      
      });
      });
