/// <reference types='cypress' />

describe('Book Store app', () => {

  it('shold login user', () => {
    cy.visit('/login')
    cy.get('input[placeholder="UserName"]').type('nazar552');
    cy.get('input[placeholder="Password"]').type('Nazar5522@')
    cy.get('#login').click()
    cy.get('#userName-value').should('contain.text', 'nazar552');
    cy.url().should('contain', 'profile');
    cy.get('span.text').contains('Book Store').click();
    cy.get('input[placeholder="Type to search"]').type('Speaking JavaScript');
    cy.get('a').contains('JavaScript').click();
    cy.get('.form-label').should('contain.text', 'Speaking JavaScript');
    cy.get('.text-right > #addNewRecordButton').click()
    cy.on('window:alert', (str) => {
      if (str.includes('added')) {
        expect(str).to.equal('Book added to your collection.');
      } else if (str.includes('deleted')) {
        expect(str).to.equal('Book deleted.');
      } else {
        cy.log(`Unexpected alert message: ${str}`);
      }
    });
  
    cy.get('span.text').contains('Profile').click();
    cy.get('a').should('contain.text', 'JavaScript')
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
  });
});
