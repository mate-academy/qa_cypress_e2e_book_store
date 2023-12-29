/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'nazar552',
    password: 'Nazar5522@'
  };
  it('should login the user', () => {
    cy.visit('/login')
    cy.get('input[placeholder="UserName"]').type(user.username);
    cy.get('input[placeholder="Password"]').type(user.password)
    cy.get('#login').click()
    cy.get('#userName-value').should('contain.text', user.username);
    cy.url().should('contain', 'profile');
  });

  it('should provide ability to add the book to the colletion', () => {
    
    cy.login(user);
    cy.visit('/books');
    cy.url().should('contain', 'books');
    cy.get('span.text').contains('Book Store').click();
    cy.get('input[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('a').contains('JavaScript').click();
    cy.get('.form-label').should('contain.text', 'Speaking JavaScript');
    cy.get('.text-right > #addNewRecordButton').click()
    cy.alertBookAdded();
    cy.visit('/profile');
    cy.get('a').should('contain.text', 'Speaking JavaScript');
  });

  it('should provide ability to delete the book from the colletion', () => {
    
    cy.login(user);
    cy.visit('/profile');
    cy.url().should('contain', 'profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.alertBookDeleted();
    cy.get('a').should('not.contain.text', 'Speaking JavaScript');

  });
});
