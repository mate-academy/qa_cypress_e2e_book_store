/// <reference types='cypress' />

describe('Registration', () => {

  const user = {
    username: 'testuser_1', 
    password: '123456Qwerty!',
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media'
  }

  beforeEach(() => {
    cy.login();
  });

  it('User is able to log in', () => {
    cy.get('#userName-value').should('contain', user.username);
  });

  it('User is able to add a book ', () => {
    cy.contains('.btn.btn-light', 'Book Store').click();
    cy.url().should('include', '/books');
    cy.findByPlaceholder('Type to search').type('Speaking JavaScript');
    cy.get('.col-12.mt-4.col-md-6').should('contain.text', 'Speaking JavaScript');
    cy.contains('[role="row"]', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.get('.text-right.fullButton .btn.btn-primary').click({ delay: 10000 });
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
    it('User is able to delete a book', () => {
    cy.contains('#item-3', 'Profile').click();
    cy.get('#delete-record-undefined').click();
    cy.get('[id="closeSmallModal-ok"]').click();
    });
  })
});