/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  afterEach(() => {
    cy.contains('#submit', 'Log out').click();
  });

  it('Should login user', () => {
    cy.findAndFillInput('userName', Cypress.env('userName'));
    cy.findAndFillInput('password', Cypress.env('password'));
    cy.getElementById('login').click();
    cy.url().should('include', '/profile');
  });

  it('Should be able to add a book', () => {
    cy.login(Cypress.env('userName'), Cypress.env('password'));
    cy.visit('/books');
    cy.findOneItem('Speaking JavaScript');
    cy.contains('a', 'Speaking JavaScript').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile');
    cy.contains('a', 'Speaking JavaScript').should('exist');
  });

  it('Should delete the book', () => {
    cy.login(Cypress.env('userName'), Cypress.env('password'));
    cy.findOneItem('Speaking JavaScript');
    cy.getElementByAttribute('title', 'Delete').click();

    cy.get('.modal-body').should(
      'contain.text',
      'Do you want to delete this book?'
    );
    cy.getElementById('closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
    });
  });
});
