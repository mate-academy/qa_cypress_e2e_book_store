/// <reference types='cypress' />

describe('Book store app user can', () => {
  // registration
  // before(() => {
  //   cy.visit('https://demoqa.com/register');
  //   cy.get('#firstname').type('RealName')
  //   cy.get('#lastname').type('Nifigasobifamilia')
  //   cy.get('#userName').type('RealTestUser')
  //   cy.get('#password').type('Pa$$w0rd')
  //   cy.get('#recaptcha-anchor').click()
  //   cy.get('#register').click();
  // })

  const user = {
    "userName": "RealTestUser",
    "password": "Pa$$w0rd"
  }

  beforeEach(() => {
    cy.login();
  });

  it('successfully login', () => {

    // Check your username after login username
    cy.get('#userName-value')
      .should('have.text', user.userName)
  });

  it('find book in the bookstore and add it to collection', () => {

    // Navigate to books list
    cy.get('.menu-list').contains('Book Store')
      .click()
    cy.get('.playgound-header')
      .should('include.text', 'Book Store')
    
    // Type into search field "Speaking JavaScript"
    cy.get('#searchBox')
      .type('Speaking JavaScript')
    cy.get('.rt-tbody')
      .should('contains.text', 'Speaking JavaScript')
    
    // Click on 'Speaking JavaScript' link
    cy.get('[id^=see-book-Speaking]')
      .click()
    cy.get('#title-wrapper')
      .should('contains.text', 'Speaking JavaScript')

    // Click on [Add To Your Collection] button on Speaking JavaScript preview page
    cy.get('button').contains('Add To Your Collection')
      .click({ force: true })
    
    // Confirm popup
    // cy.on('window:confirm', (str) => {
    // expect(str).to.equal('Book added to your collection.')
    // })
   
    // check book in collection
     cy.get('.menu-list').contains('Profile')
      .click({force: true})
     cy.get('.playgound-header')
      .should('include.text', 'Profile')
     cy.get('.rt-tbody')
      .should('contains.text', 'Speaking JavaScript')
    
  });

  it('delete book from collection', () => {

    //  Open your profile page
     cy.get('.menu-list').contains('Profile')
      .click({force: true})
     cy.get('.playgound-header')
      .should('include.text', 'Profile')
    
    // Assert 'Speaking JavaScript' in your shopping list
     cy.get('.rt-tbody')
      .should('contains.text', 'Speaking JavaScript')
    
    // Delete Speaking JavaScript book from your list
    cy.get('#delete-record-undefined')
      .click()
    cy.get('#closeSmallModal-ok')
      .click()
    cy.get('.rt-tbody')
      .should('not.contains.text', 'Speaking JavaScript')
  });
});
