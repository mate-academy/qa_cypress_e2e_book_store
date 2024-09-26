/// <reference types='cypress' />

describe('Book Store app', () => {
  
  const user = {
    username: 'Cokka',
    password: 'Cokka2024!'
  };

  it('should provide an ability to login', () => {
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click()
    
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });
  
  it('should allow to search for a book', () => {
    const bookName = 'Speaking JavaScript';

    cy.login();
    cy.visit('/books');

    cy.get('#userName-value').should('contain.text', user.username);
    cy.get('#searchBox').type(bookName);
    cy.get('[href="/books?book=9781449365035"]')
      .should('contain.text', bookName);
    cy.get('.rt-td').should('contain.text', 'Axel Rauschmayer');
    cy.get('.rt-td').should('contain.text', 'O\'Reilly Media');
  });

})
