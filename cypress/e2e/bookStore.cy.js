/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Kasia',
    password: '12345Qwert!'
  }  
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: `O'Reilly Media`
  }

  before(() => {
    cy.visit('https://demoqa.com/login')
  })

  it('should provide the ability to login', () => {
    cy.get('#userName').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login').click()
    cy.url().should('not.include', 'https://demoqa.com/login')
    cy.url().should('include', 'https://demoqa.com/profile')
    cy.get('#userName-value').should('contain', user.username)
  })
  
  it('should provide the ability to search for the book', () => {
    cy.login()
    cy.visit('https://demoqa.com/books')
    cy.contains('#item-2', 'Book Store').click()
    cy.findByPlaceholder('Type to search').type(book.title)
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher)
  })
});
