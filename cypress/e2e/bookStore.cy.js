/// <reference types='cypress' />


describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  const username = 'skoruk';
  const password = 'P@ssw0R1';
  const book = 'Speaking JavaScript';

  it('Testing book store', () => {
    // Login and assert new URL
    cy.get('input[placeholder = "UserName"]').type(username);
    cy.get('input[placeholder = "Password"]').type(password);
    cy.contains('button', 'Login').click();
    cy.get('div[class="mt-2 align-items-center row"]').should('contain', username);
    cy.url().should('eq', 'https://demoqa.com/profile'); 
    // Navigate to book store
    cy.get('button[id = "gotoStore"]').click({force: true});
    cy.url().should('eq', 'https://demoqa.com/books');
    // Type into the search field 'Speaking JavaScript'
    cy.get('input[placeholder = "Type to search"]').type(book);
    cy.get('span[id = "see-book-Speaking JavaScript"]').should('exist');
    // Click on the 'Speaking JavaScript' book.
    cy.get('span[id = "see-book-Speaking JavaScript"]').click();
    cy.contains('label', 'Description').should('contain.text', 'Description');
    // Click on [Add To Your Collection].
    cy.contains('button', 'Add To Your Collection').click({force: true});
    // Confirm popup. You can do it with cy.on():
    cy.on('window:confirm', () => true);
    // Go to your profile page.
    cy.visit('https://demoqa.com/profile');
    cy.url().should('eq', 'https://demoqa.com/profile');
    cy.get('span[id = "see-book-Speaking JavaScript"]').should('exist');
    // Delete the Speaking JavaScript book from your list
    cy.get('path[d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z"]').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:confirm', () => true);
  });
});
