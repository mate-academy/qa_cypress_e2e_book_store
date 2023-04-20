/// <reference types='cypress' />
import { user } from "../support/testData";
import { book } from "../support/testData";

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
    cy.viewport(1488, 1000)
  });

  beforeEach(() => {
    cy.viewport(1200, 1000)
  });


  it.skip('user should be able to login', () => {
    cy.get('#userName').type(user.username)

    cy.get('#password').type(user.password)

    cy.get('#login').click()

    cy.get('#userName-value')
    .should('contain', user.username)

    cy.url().should('contain', '/profile')
  });

  it('User should be able to add a book', () => {
    cy.login().then(() => {
      cy.visit('/profile')

      cy.get('#gotoStore').click()
  
      cy.get('#searchBox').type(book.name)
  
      cy.contains('a', book.name).click()
  
      cy.get('#description-wrapper')
      .contains(book.description)
  
      cy.contains('Add To Your Collection').click({ timeout: 4000 });

      cy.intercept('POST', 'https://demoqa.com/BookStore/v1/Books').as('getBook')

      cy.wait('@getBook')
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    })
    })

  });

  it('User should be able to delete a book', () => {
    cy.login()

    cy.visit('/profile')

    cy.contains('a', book.name).should('be.visible', { timeout: 4000 });

    cy.get('#delete-record-undefined').click()

    cy.contains('button', 'OK').click()
    
    cy.contains('No rows found').should('exist')
  });
});
