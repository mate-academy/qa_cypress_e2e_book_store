/// <reference types='cypress' />

const doClick = require("../support/DoClick");

describe('Book Store app', () => { 
  const username = 'TestCypress';
  const book = 'Speaking JavaScript';
  const idBook= 'book=9781449365035';

  beforeEach(() => {

    cy.logInNewUser().as('user')
    cy.visit('https://demoqa.com/profile') 
  });

  //afterEach(() =>{
    //if (cy.contains((('#see-book-Speaking\ JavaScript > a')))) {
       //doClick.click('#delete-record-undefined');
       //doClick.click('#closeSmallModal-ok');
    //}
  //})
 
  it('LogIn is done successfully', () => {   
    cy.get('#userName-value').should('contain.text',username); 
    cy.url().should('equal', Cypress.config().baseUrl + '/profile');  
  });

  it('Add book', () => {   
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.click('#gotoStore');
    cy.get('#searchBox').type(book).wait(500);
    cy.get(`a[href="/books?${idBook}"]`).contains(book).click();
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    cy.get('.text-right > #addNewRecordButton').scrollIntoView().click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.clickleftSideBar(':nth-child(6) > .group-header > .header-wrapper > .header-text');
    doClick.clickleftSideBar(':nth-child(6) > .element-list > .menu-list > #item-3');
   
    cy.contains('a',`${book}`).should('have.attr','href',`/profile?${idBook}`);

    doClick.click('#delete-record-undefined');
    doClick.click('#closeSmallModal-ok');
  });

  it('Delete book', () => {   
   
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper'); 
    doClick.click('#gotoStore');
    cy.get('#searchBox').type(book).wait(500);
    cy.get(`a[href="/books?${idBook}"]`).contains(book).click();
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    cy.get('.text-right > #addNewRecordButton').scrollIntoView().click();  
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.clickleftSideBar(':nth-child(6) > .group-header > .header-wrapper > .header-text');
    doClick.clickleftSideBar(':nth-child(6) > .element-list > .menu-list > #item-3');
    cy.wait(5000);
    doClick.click('#delete-record-undefined');
    doClick.click('#closeSmallModal-ok');

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    });   

  }); 
});

