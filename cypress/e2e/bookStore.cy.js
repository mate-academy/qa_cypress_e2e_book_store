/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'QA_septem22',
    password: '!QAseptem22',
  };

  before(() => {
    cy.visit('/');
  });

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')  
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value') 
      .should('contain', user.username);  
    cy.url()
      .should('include', '/profile');
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
      .click();  
    cy.get('#searchBox')
      .type('Speaking JavaScript'); 
    cy.get('a[href="/books?book=9781449365035"]')
      .click();
    cy.get('#description-wrapper') 
      .should('contain', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.');
    cy.contains('Add To Your Collection') 
      .click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
    });
    cy.visit('/profile'); 
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain', 'Speaking JavaScript');
    cy.get('#delete-record-undefined')   
      .click();   
    cy.get('#closeSmallModal-ok')
      .click();       
  });
});
