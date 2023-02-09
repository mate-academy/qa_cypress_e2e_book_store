/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login')
  });

  const username = 'Kris_test';
  const password = 'Test123!';
  const book = 'Speaking JavaScript';
  const description = 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you';


  it('Should provide an ability to add book', () => {
    cy.get('#userName')
      .type(username)

    cy.get('#password')
      .type(password)

    cy.get('#login')
      .click()

    cy.url()
      .should('include', 'profile')

    cy.get('#userName-value')
      .should('contain', username)

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2')
      .click()

    cy.get('#searchBox')
      .click()
      .type(book)

    cy.get('#basic-addon2')
      .click()
    
    cy.contains('a', book)
      .click()

    cy.get('#description-wrapper > .col-md-9 > #userName-value')
      .should('contain.text', description)
     
    cy.get('.text-right > #addNewRecordButton')
      .click()
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.');
    });

    cy.visit('/profile')

    cy.contains('a', book)
      .should('contain.text', book)
  }); 

  it('Should provide an ability to delete book', () => {
    cy.request('POST', '/Account/v1/Login', {
      userName: username,
      password
    }).then(response => {
      cy.setCookie('token', response.body.token);
      cy.setCookie('expires', response.body.expires);
      cy.setCookie('userName', response.body.username);
      cy.setCookie('userID', response.body.userId);
    });

    cy.visit('/profile')
    cy.get('#delete-record-undefined')
      .click()
  
    cy.get('#closeSmallModal-ok')
      .click()
  });
});
