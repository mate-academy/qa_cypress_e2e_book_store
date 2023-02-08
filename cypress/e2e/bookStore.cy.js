/// <reference types='cypress' />

const username = 'NotUserName'

const password = 'NotApa$$word123'

const bookname = 'Speaking JavaScript'

describe('Book Store app', () => {
  before(() => {
    cy.visit('/')
  });

  it('The user should be able to Login', () => {
    cy.visit('/login')

    cy.url()
     .should('contain', '/login')

    cy.findByPlaceholder('UserName')
     .type(username)

    cy.findByPlaceholder('Password')
     .type(password)
    
    cy.contains('#login', 'Login')
     .click()

    cy.url()
     .should('contain', '/profile')
    
     cy.contains('label', username)
     .should('be.visible'); 
    
    });

  it('The user should be able to add book to collection', () => {
    
    cy.login(username, password);

    cy.contains('#item-2', 'Book Store')
     .click()

    cy.url()
     .should('contain', '/books')

    cy.findByPlaceholder('Type to search')
     .type(bookname)

    cy.contains('a', 'Speaking JavaScript')
     .click()

    cy.get('#description-wrapper')
     .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')
  
    cy.contains('button', 'Add To Your Collection')
     .click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })

    cy.visit('/profile')

    cy.get('.ReactTable')
     .should('contain', 'Speaking JavaScript');
  });

  it('The should be able to delete book from the collection', () => {
    
    cy.login(username, password);

    cy.addbook();

    cy.visit('/profile')

    cy.get('#delete-record-undefined')
     .click()

    cy.contains('button', 'OK')
     .click()
    
  })
});
