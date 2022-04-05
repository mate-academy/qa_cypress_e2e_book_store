/// <reference types='cypress' />

declare namespace Cypress {
  interface Chainable <Subject> {
    login(): Chainable<any>
    deleteBooks(): Chainable<any>
    deleteAddedBook(): Chainable<any>
    addBook(): Chainable<any>
    
  }
}

