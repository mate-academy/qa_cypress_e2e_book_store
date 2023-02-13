/// <reference types='cypress' />

const user = {
  userName:'dofii@gmail.com',
  password: 'Password1!'
};

const book = { 
  name :'Speaking JavaScript',
  description : 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have.'
};

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
  });

  it('should allow registered user to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.userName);
    cy.findByPlaceholder('Password')
      .type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value')
      .should('contain.text',user.userName);
    cy.url()
      .should('include', '/profile');
  });

  it('should add selected book', () => {
    cy.login(user.userName, user.password);
    cy.get('#gotoStore')
      .click();
    cy.findByPlaceholder('Type to search')
      .type(book.name);
    cy.get('a').contains(book.name)
      .click();
    cy.get('.form-label')
      .should('contain.text', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.additionAlert();
    cy.visit('/profile');
    cy.get('.rt-tbody')
      .should('contain', book.name);
  });

  it('should delete selected book', () => {
    cy.login(user.userName, user.password);
    cy.get('#gotoStore')
      .click();
    cy.findByPlaceholder('Type to search')
      .type(book.name);
    cy.get('a').contains(book.name)
      .click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.visit('/profile');
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
      .click();
    cy.deletionAlert();
  });
});
