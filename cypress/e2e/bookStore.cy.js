/// <reference types='cypress' />

describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should allow user to log in', () => {
    const user = {
      userName: 'FrodoBaggins',
      password: 'Shire123!',
    };

    cy.findByPlaceholder('UserName').type(user.userName);
    cy.findByPlaceholder('Password').type(user.password);
    cy.contains('button', 'Login').click();

    cy.get('#userName-value').should('contain', user.userName);
    cy.url().should('equal', Cypress.config().baseUrl + '/profile');
  });

  it('should allow to add the book', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('.text', 'Book Store').click({ force: true });
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.get('#basic-addon2').click();
    cy.contains('a', 'Speaking JavaScript').click();
    cy.get('#description-wrapper')
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.get('.text-right > #addNewRecordButton')
      .click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });

    cy.contains('.text', 'Profile').click({ force: true });
    cy.get('a').should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });

  it('should allow to delete added book', () => {
    cy.login();
    cy.visit('/profile');
    cy.addBook();
    cy.contains('.text', 'Profile').click({ force: true });

    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
