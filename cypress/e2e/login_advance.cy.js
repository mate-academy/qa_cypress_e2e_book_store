/// <reference types='cypress' />

describe('Name of the group', () => {
 
  
    
  //cy.request().then((resp) => {resp.body.token ....})

  const user = {
    username: 'user_test_qa', 
    password: 'Qwerty12345!',
  };

  beforeEach(() => {  
    
    cy.request('POST', '/login', {
      userName: "user_test_qa", 
      password: "Qwerty12345!"
    })
    .then(response => {
      cy.setCookie('token', responce.body,token) 
    })
  });


    
it('should successfully log in', () => {
  cy.get('#userName-value').should('contain', user.username);
});

it('Navigate to books list', () => {
  //cy.contains('.header-text', 'Book Store Application').click();
  cy.contains('#item-3', 'Profile').click();
  cy.get('[id="delete-record-undefined"]').click();
  cy.get('[id="closeSmallModal-ok"]').click();
  
  cy.contains('.btn.btn-light ', 'Book Store').click();
  cy.url().should('include', '/books');
  cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
  cy.get('.col-12.mt-4.col-md-6').should('contain.text', 'Speaking JavaScript');

  cy.get('[id="see-book-Speaking JavaScript"]').click();
  cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
  //cy.get('.text-right.fullButton .btn.btn-primary').click();
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
})
});


});
