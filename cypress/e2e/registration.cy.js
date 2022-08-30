/// <reference types='cypress' />

describe('Tools QA', () => {

  const user = {
    userName : 'Vasil1984',
    password : 'Dkqb6v349DH@' 
  };

  beforeEach(() => {
    cy.login();
  });

  it('should login registered user and add a book', () => {
    
    cy.get('#userName-value')
      .should('contain', user.userName);

    cy.get('#gotoStore')
      .click();

    cy.get('[placeholder="Type to search"]')
      .type('Speaking JavaScript')  

    cy.get('.mr-2') 
      .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();  

    cy.on('window:alert', (str) => {

      expect(str).to.equal(`Book added to your collection.`)

    });  
  });   

  it('should delete a book', () => {    

    cy.contains('#item-3', 'Profile')
      .click(); 
    
    cy.get('[id="see-book-Speaking JavaScript"]')  
      .should('contain', 'Speaking JavaScript');
     
    cy.get('#delete-record-undefined')  
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {

      expect(str).to.equal(`Book deleted.`)
  
    });  
  });
});
