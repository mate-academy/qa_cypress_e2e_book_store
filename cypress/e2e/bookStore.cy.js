/// <reference types='cypress' />

const doClick = require("../support/DoClick");

describe('Book Store app', () => {
  const username = 'TestCypress'
  const password = 'TestCypress123!'
  const book = 'Speaking JavaScript';
  const description = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o';
  const idBook= 'book=9781449365035'
 
  it('Assert username after login username', () => {
    cy.visit('/login');  
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    doClick.click(`#login`)

    cy.get('#userName-value').should('contain.text',username);
    
  });

  it('Asser new url after LogIn', () => {
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    doClick.click(`#login`);

    cy.url().should('equal', Cypress.config().baseUrl + '/profile');    

  });

  it('Assert description of the book', () => {
    cy.visit('/login');    
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    doClick.click(`#login`);
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.click('#gotoStore');
    cy.get('#searchBox').type(book).wait(500);
    cy.get(`a[href="/books?${idBook}"]`).contains(book).click(); 

    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain.text', description); 
  });

  it('Assert "Speaking JavaScript" is in the shopping list', () => {
    cy.visit('/login');
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    doClick.click('#login');
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.click('#gotoStore');
    cy.get('#searchBox').type(book).wait(500);
    cy.get(`a[href="/books?${idBook}"]`).contains(book).click();
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    cy.get('.text-right > #addNewRecordButton').scrollIntoView().click();
    
    cy.on('window:alert', (str) => {expect(str).to.equal(`Book added to your collection.`)});
  
    doClick.clickleftSideBar(':nth-child(4) > .group-header > .header-wrapper');
    doClick.clickleftSideBar(':nth-child(6) > .group-header > .header-wrapper > .header-text');
    doClick.clickleftSideBar(':nth-child(6) > .element-list > .menu-list > #item-3');
   
    cy.contains('a',`${book}`).should('have.attr','href',`/profile?${idBook}`);

    doClick.click('#delete-record-undefined');
    doClick.click('#closeSmallModal-ok');
   
  })

});
