/// <reference types='cypress' />


const user = {
  username: 'Bobby',
  password: 'Zxc123###'
}; 
const book = {
  name: 'Speaking JavaScript',
  description: 'JavaScript is everywhere',
} 


describe('Book Store app', () => {
  before(() => {
    cy.visit('/login'); 
  });


  it('should login user to the store', () => {
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('contain', '/profile');
  });


  it('should add the book to the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('.text', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.name);
    cy.contains('a', book.name).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book added to your collection.`)
    })
  });

  
  it('should delete the book from the collection', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.url().should('include', '/profile');
    cy.get('.ReactTable').should('contain', book.name);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').should('contain', 'OK').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(`Book deleted.`)
  })
  });
});
