/// <reference types='cypress' />

describe('Book Store app', () => {
const user = {
  userName: 'max',
  password: 'Cy1@Password',
}

const book = {
  title: 'Speaking JavaScript',
  description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o',
}

  beforeEach(() => {
    cy.visit('/login')
  });

  it.skip('should be possible to log in for existed user', () => {
    cy.findByPlaceholder('UserName')
      .type(`${user.userName}`)

    cy.findByPlaceholder('Password')
      .type(`${user.password}`)

    cy.contains('button', 'Login').click()

    cy.get('#userName-value')
      .should('contain.text', `${user.userName}`)

    cy.get('#gotoStore')
      .click({ force: true })

    cy.contains('a', 'Speaking JavaScript')
      .click()

    cy.get('#title-wrapper')
      .should('contain.text', book.title)

    cy.get('#description-wrapper')
      .should('contain.text', book.description)

      
    cy.contains('button', 'Add To Your Collection')
      .click({ force: true })

    cy.visit('/profile')

    cy.contains('a', 'Speaking JavaScript')
      .should('exist')
    
    cy.contains('button', 'Delete All Books')
     .click({ force: true })

     cy.on('window:alert', (alarm) => {
      expect(alarm).to.equal(`All Books deleted.`)
      })

    cy.get('#closeSmallModal-ok')
      .click()

    cy.contains('a', 'Speaking JavaScript')
      .should('not.exist')
  });

  it('should be possible to add book to collection', () => {
    cy.login(user);

    cy.visit('/profile')

    cy.get('#userName-value')
      .should('contain.text', `${user.userName}`)

      cy.get('#gotoStore')
      .click({ force: true })

    cy.contains('a', 'Speaking JavaScript')
      .click()

    cy.get('#title-wrapper')
      .should('contain.text', book.title)

    cy.get('#description-wrapper')
      .should('contain.text', book.description)

      
    cy.contains('button', 'Add To Your Collection')
      .click({ force: true })

    cy.visit('/profile')

    cy.contains('a', 'Speaking JavaScript')
      .should('exist')
  });

  it('should be possible to delete book from collection', () => {
    cy.login(user);

    cy.visit('/profile')

    cy.contains('a', 'Speaking JavaScript')
      .should('exist')

    cy.contains('button', 'Delete All Books')
      .click({ force: true })
 
    cy.on('window:alert', (alarm) => {
       expect(alarm).to.equal(`All Books deleted.`)
       })
 
    cy.get('#closeSmallModal-ok')
       .click()
 
    cy.contains('a', 'Speaking JavaScript')
       .should('not.exist')
  });
});
