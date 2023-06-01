/// <reference types="cypress" />

describe('Book Store App', () => {
  before(() => {
    cy.viewport(1920, 1080);
    cy.visit('https://demoqa.com/login');
  });

  beforeEach(() => {
    cy.reload();
  });

  it('Login', () => {
    cy.get('#userName').type('bastard99');
    cy.get('#password').type('Qwerty123456!');
    cy.get('#login').click();
    cy.contains('bastard99').should('have.text', 'bastard99');
    cy.url().should('include', '/profile');
    cy.contains('Go To Book Store').should('exist').click();
    cy.url().should('include', '/books');
    cy.get('#searchBox').type('Speaking JavaScript');
    cy.contains('.mr-2', 'Speaking JavaScript').click();
    cy.contains('button', 'Add To Your Collection').click();
    cy.window().then((win) => {
      cy.stub(win, 'alert').as('windowAlert');
    });
    cy.get('@windowAlert').should('be.calledWith', 'Book added to your collection.');
    cy.visit('https://demoqa.com/profile');
    cy.contains('Speaking JavaScript').should('exist');
    cy.contains('Delete All Books').click();
    cy.on('window:confirm', () => {
      cy.get('.confirm').click();
    });
    cy.get('#closeSmallModal-ok').click();
    cy.reload();
    cy.contains('No rows found').should('exist');
  });
});
