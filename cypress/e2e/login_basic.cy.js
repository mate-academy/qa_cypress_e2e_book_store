/// <reference types='cypress' />

describe('Should test the site "demoqa.com"', () => {
  
  const user = {
    username: 'user_test_qa', 
    password: 'Qwerty12345!',
  };

  beforeEach(() => {
    cy.login();
  });
    
  it('Should successfully log in', () => {
    cy.get('#userName-value').should('contain', user.username);
  });

  it('Should add a book', () => {
    cy.contains('.btn.btn-light ', 'Book Store').click();
    cy.url().should('include', '/books');
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.get('.col-12.mt-4.col-md-6').should('contain.text', 'Speaking JavaScript');
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.get('.text-right.fullButton .btn.btn-primary').click({ delay: 10000 });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    cy.contains('#item-3', 'Profile').click();
    cy.get('[id="delete-record-undefined"]').click();
    cy.get('[id="closeSmallModal-ok"]').click();
  });
});
