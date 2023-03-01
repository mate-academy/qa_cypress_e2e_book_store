/// <reference types='cypress' />

describe('Should successful login', () => {
    before(() => {
      cy.visit('https://demoqa.com/login')
    });
  
    it('Should be successful login', () => {
      cy.get('#userName')
        .type('TestUser7');
  
      cy.get('#password')
        .type('TestUser7!');
  
      cy.get('#login')
        .click();
  
      cy.get('#userName-value')
        .should('contain.text', 'TestUser7');
  
      cy.url()
        .should('include', '/profile');
    });
});