/// <reference types='cypress' />

describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');  // 1. Login
  });

  it('performs the desired flow', () => {
    cy.get('#userName').type('testUserName'); 
    cy.get('input[type="password"]').type('Password1234$');

    cy.get('#userName-value').should('contain', 'testUserName');
    cy.url().should('eq', 'https://demoqa.com/profile');

    cy.get('button#gotoStore').click({ force: true });  // 2. Navigate to Book store
    

    // 3. Type into search field 'Speaking JavaScript'
    cy.get('#searchBox').type('Speaking JavaScript', { delay: 100 });

    cy.contains('Speaking JavaScript').click({ force: true });// 4. Click on 'Speaking JavaScript' book
    
    cy.get('label#userName-value').should('contain', 'Speaking JavaScript'); // 4. Assert description of the book

    // 5. Click on [Add To Your Collection]
    cy.get('button#addNewRecordButton').eq(0).click({ force: true });
    
    // 6. Confirm popup
    cy.on('window:alert', (str) => { 
      expect(str).to.equal('Book added to your collection.');
      cy.get('button.swal-button--confirm').click();
    });

    //cy.contains('Profile').click(); // 7.Go to your profile page.
    cy.visit('https://demoqa.com/profile');
    cy.wait(2000); 
    cy.contains('Speaking JavaScript'); // 8. Assert 'Speaking JavaScript' in your shopping list
    /*
    cy.contains('Profile').click()  // 7. Go to your profile page
      .then(() => {
        cy.wait(2000);
        cy.contains('Speaking JavaScript'); // 8. Assert 'Speaking JavaScript' in your shopping list
      }); */

    // 9. Delete the Speaking JavaScript book from your list
    cy.get('span[data-toggle="tooltip"][title="Delete"]').last().click();
    cy.get('button#closeSmallModal-ok').click();
    cy.contains('Speaking JavaScript').should('not.exist');
  });
});
