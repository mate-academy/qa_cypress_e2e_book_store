/// <reference types='cypress' />

describe('Registration', () => {
  beforeEach(() => {
    cy.login();
  });

    it('', () => {
      cy.visit('https://demoqa.com/profile');

      cy.contains('[id="userName-value"]', 'donchukoff');
    });

    it.only('finding book', () => {
      cy.viewport(1500, 500);
      
      cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
        .click();
      
      cy.get('[id="searchBox"]')
        .type('Speaking JavaScript');

      cy.get('#basic-addon2')
        .click();
      
      cy.contains('[id="see-book-Speaking JavaScript"]', 'Speaking JavaScript')
          .click();

      cy.contains('[id="userName-value"]', 'Speaking JavaScript');

      cy.contains('[id="addNewRecordButton"]', 'Add To Your Collection')
        .click();

        //cy.on('window:alert', (str) => {
          //expect(str).to.equal(`Book already present in the your collection!`);
      

      cy.contains('[class="text"]', 'Profile')
        .click();

      cy.get('[id="delete-record-undefined"]')
        .click();
        
      cy.get('[id="closeSmallModal-ok"]')
        .click();
      
      cy.on('window:alert', (str) => {
          expect(str).to.equal(`Book deleted.`)
      });
      
    });
});

  