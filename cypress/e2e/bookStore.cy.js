/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'kristinatest',
    password: 'Kristina24@'
  };
  beforeEach(() => {
   cy.visit('https://demoqa.com/login'); 
  });

  it('should provide an ability to log in with valid credentials', () => {
    cy.get('#userName')
      .type(user.username);
    cy.get('#password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain', user.username);
    cy.url()
      .should('contain', 'https://demoqa.com/profile');
  });

  it('should provide an ability to find a book in store and add it to collection', () => {
    cy.login(user.username, user.password);
    cy.visit('https://demoqa.com/profile');
    cy.get('#gotoStore')
      .click();
    cy.get('#searchBox')
      .type('Speaking JavaScript');
    cy.get('.rt-tr-group')
      .contains('Speaking JavaScript').click();
     cy.get('#description-wrapper')
       .should('contain', 'Like it or not, JavaScript');
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.')
    });
  });
  
  it('should provide an ability to delete a book from collection', () => {
    cy.login(user.username, user.password);
    cy.visit('https://demoqa.com/profile');
     cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('.rt-tbody','Speaking JavaScript')
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMessage.deleteD)
    })
  });
});
