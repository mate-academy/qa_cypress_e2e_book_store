/// <reference types='cypress' />
const user = {
  username: 'synytigyv',
  password: 'Pa$$w0rd!',
};

const book = { 
  name :'Speaking JavaScript',
  desc : 'Like it or not, JavaScript is everywhere'
};
describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
    cy.viewport(1100, 1100);
  });

  it('should provide an ability to log in', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);

    cy.findByPlaceholder('Password')
      .type(user.password);

    cy.get('#login')
      .click();

    cy.get('#userName-value')
      .should('contain', user.username)

    cy.url()
      .should('contain','/profile');

  });

   it('should provide an ability to add a book to the shopcart', () => { 


    cy.login(user.username, user.password);

    cy.visit('https://demoqa.com/profile');

    cy.url().should('contain', '/profile');

    cy.get('#gotoStore')
      .click();

    cy.get('#searchBox')
      .type(book.name);

    cy.contains('a', book.name)
      .click();

    cy.get('#description-wrapper')
      .should('contain', book.desc);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.checkAddPopUp();

    cy.visit('https://demoqa.com/profile');

    cy.get('.rt-tbody')
      .should('contain', book.name);

  });

  it('should provide an ability to remove a book from the shopcart', () => { 

    cy.login(user.username, user.password);
    cy.addBook(book.name, book.desc);

    cy.visit('https://demoqa.com/profile');

    cy.get('.rt-tbody')
      .should('contain', book.name);

    cy.get('#delete-record-undefined')
      .click();

    cy.checkDeletePopUp();

    cy.get('#closeSmallModal-ok')
      .click();

  });
  

});
