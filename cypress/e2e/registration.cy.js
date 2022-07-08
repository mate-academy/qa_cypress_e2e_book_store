/// <reference types='cypress' />

describe('Name of the group', () => {
  const bookName = 'Speaking JavaScript';


  beforeEach(() => {
    cy.visit('/');
    cy.login();
  });

  it('should add book to your collection', () => {
    cy.contains('#item-2','Book Store')
      .click();
    cy.get('#searchBox')
      .type(bookName);
    cy.contains('a', bookName)
      .click();
    cy.contains('button','Add To Your Collection')
      .click({force: true});
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    })
       
    
    
  });

  it('should delete book from your collection', () => {
    cy.contains('#item-3','Profile')
      .click();
    cy.contains(".rt-tr.-odd", bookName)
      .find("#delete-record-undefined")
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    })
       
    
    
  


});