// cypress_fourth_hw.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// User
// First Name: Anastasiia
// Last Name: Tester
// UserName: ATester
// Password: 123456Qwerty!

const user = {
  userName: 'ATester',
  password: '123456Qwerty!'
}

const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: `O'Reilly Media`
}
// To make it work, you need to uncomment the command Cypress.Cookies.defaults in commands.js
describe('Basic level after change in Advanced level', () => {
  it('Login as your registered account and check your username after login username', () => {
    cy.visit('/login');
    cy.get('#userName-value').should('contain', user.userName);
  })

  it('Add book the "Speaking JavaScript" in your collection', () => {
    cy.visit('/login');
    cy.contains('.btn.btn-light', 'Book Store').click();
    cy.get('#searchBox').type('{selectall}').type(book.title).type('{enter}');
    cy.get('.action-buttons').should('contain', book.title).click();
    cy.url().should('include', '/books?book=');
    cy.contains('#userName-value', book.title).should('exist');
    cy.contains('#userName-value', book.author).should('exist');
    cy.contains('#userName-value', book.publisher).should('exist');
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book already present in the your collection!`)
     });
  })

  it('Assert "Speaking JavaScript" in your shopping list and delete the book from your list', () => {
    cy.visit('/login');
    cy.contains('.btn.btn-light', 'Profile').click();
    cy.url().should('include', '/profile');
    cy.get('.rt-tbody').should('contain', book.title);
    cy.get('#searchBox').type('{selectall}').type(book.title).type('{enter}');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
     });
    cy.get('#searchBox').type('{selectall}').type('{backspace}');
  })
});