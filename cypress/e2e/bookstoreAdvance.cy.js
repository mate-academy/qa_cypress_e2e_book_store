/// <reference types='cypress' />

describe('Book Store app', () => {
    
     
  before(() => {
      cy.visit('/login')
      
  });
  
  it('should provide user to log in and check it', () => {
      const user = {
        username:'batman',
        password: 'Banman!123'
      };

    cy.get('#userName').type(user.username);

    cy.get('#password').type(user.password);

    cy.get('#login').click();

    cy.get('#userName-value')
      .should('contain', `${user.username}`);

    cy.url().should('include', 'profile');    
  
  });
  
  it('should provide user to add book', () => {
    
    cy.logIn();

    cy.visit('/profile');

    cy.get('#gotoStore').click({force: true});

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.get('.mr-2').click();

    cy.get('#description-wrapper').should('exist');

    cy.contains('.btn','Add To Your Collection')
      .click({force: true});

    cy.once('window:alert', (str) => {
       expect(str).to.equal(`Book added to your collection.`)
      });     
  
    cy.wait(400);
    
    cy.contains('.btn','Profile').click();

    cy.get('.rt-tbody')
      .should('contain', 'Speaking JavaScript')     
  });

  it('should provide user to delete book', () => {
    
    cy.logIn();

    cy.visit('/profile');

    cy.addBook('Speaking JavaScript');

    cy.get('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();
  });
})
