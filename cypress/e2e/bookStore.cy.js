/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
  });

  describe('Login', () => {
    it('Log in with valid credentials', () => {
      cy.visit('https://demoqa.com/login');
      cy.get('#userName').type('koko');
      cy.get('#password').type('Koko123*');
      cy.get('#login').click({ force: true });
       
    });
  });
   describe('Navigate to Book store', () => {
    it('Navigate to Book store', () => {
      cy.visit('https://demoqa.com/books');
  
      cy.url().should('eq', 'https://demoqa.com/books');
    });
  });
  
    describe('Search for a book', () => {
    it('Enter text in the search field', () => {
      cy.visit('https://demoqa.com/books');

      cy.get('#searchBox').type('Speaking JavaScript');
      cy.contains('.mr-2', 'Speaking JavaScript').click();
            
    });
  });
});
 
    describe('Add book to collection', () => {
    it('Click on [Add To Your Collection]', () => {
     
    cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
})
    });
  });
  describe('Go to profile page', () => {
  it('Navigate to profile page', () => {
    cy.visit('https://demoqa.com/profile');

    cy.url().should('eq', 'https://demoqa.com/profile');

  });
});
describe('Assert book in shopping list', () => {
  it('Assert "Speaking JavaScript" in shopping list', () => {
  
    cy.visit('https://demoqa.com/profile');

  });
});

describe('Delete book from shopping list', () => {
  it('Delete "Speaking JavaScript" from shopping list', () => {
    cy.visit('https://demoqa.com/profile');

    cy.on('window:alert', (str) => {
    expect(str).to.equal(`Delete All Books`)
    
     });
});
});
