/// <reference types='cypress' />

describe('Book Store app', () => {
const user = {
  name: 'max',
  password: 'Cy1@Password',
}

const book = {
  title: 'Speaking JavaScript',
  description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o',
}

  beforeEach(() => {
    cy.visit('/login')
  });

  it('should be possible to log in for existed user', () => {
    cy.get('[placeholder="UserName"]')
      .type(`${user.name}`)

    cy.get('[placeholder="Password"]')
      .type(`${user.password}`)

    cy.contains('button', 'Login').click()

    cy.get('#userName-value')
      .should('contain.text', `${user.name}`)

    cy.get('#gotoStore')
      .click()

    cy.contains('a', 'Speaking JavaScript')
      .click()

    cy.get('#title-wrapper')
      .should('contain.text', book.title)

    cy.get('#description-wrapper')
      .should('contain.text', book.description)

    cy.get('#addNewRecordButton')
      .click()

    cy.visit('/profile')

    cy.contains('a', 'Speaking JavaScript')
      .should('exist')
    
    cy.contains('button', 'Delete All Books')
     .click()

    cy.get('#closeSmallModal-ok')
      .click()

    cy.contains('a', 'Speaking JavaScript')
      .should('not.exist')
  });
});
