/// <reference types='cypress' />

describe('Book Store app', () => {
  const bookName = 'Speaking JavaScript'

  it('should login user witn existing values', () => {
    const userName = 'Mandalorian'
    const password = '123QWEasdzxc!'

    cy.visit('https://demoqa.com/login')

    cy.get('#userName').type(userName)

    cy.get('#password').type(password)

    cy.contains('button', 'Login').click()

    cy.get('#userName-value').should('contain', userName)

    cy.url().should('equal', 'https://demoqa.com/profile')
  })

  it('should add a book to the profile', () => {
    cy.login()

    cy.visit('https://demoqa.com/profile')

    cy.contains('#item-2', 'Book Store').click()

    cy.get('#searchBox').type(bookName)

    cy.contains('a', bookName).click()

    cy.contains(
      '.form-label',
      'Like it or not, JavaScript is everywhere'
    ).should('exist')

    cy.contains('button', 'Add To Your Collection').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  })

  it('should delete a book from the profile', () => {
    cy.login()

    cy.visit('https://demoqa.com/profile')

    cy.contains('.ReactTable', bookName).should('exist')

    cy.get('#delete-record-undefined').click()

    cy.get('#closeSmallModal-ok').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    })
  })
})
