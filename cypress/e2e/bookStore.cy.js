/// <reference types='cypress' />

describe('Book Store app', () => {
 const username = 'testqa';
 const password = 'Qwerty123$';

beforeEach(() => {
 cy.visit('https://demoqa.com/login');
 cy.viewport(1920, 1080);
  });

it('should provide the ability to log in', () => {
 cy.get('#userName')
  .type(username);
 cy.get('#password')
  .type(password);
 cy.get('#login')
  .click();
 cy.get('#userName-value')
  .should('have.text', username);
 cy.url()
  .should('contain', 'https://demoqa.com/profile');
  });

it('should allow adding the book to the collection', () => {
 cy.login(username, password);
 cy.url()
  .should('contain', 'https://demoqa.com/profile');

 cy.get('.menu-list').contains('Book Store')
  .click();
 cy.get('#searchBox')
  .type('Speaking JavaScript');
 cy.get('.rt-tr-group')
  .contains('Speaking JavaScript').click();
 cy.get('#description-wrapper')
  .should('contain', 'Like it or not, JavaScript');
 cy.get('#addNewRecordButton')
  .click();
 cy.on('window:alert', (str) => {
   expect(str).to.equal('Book added to your collection.')
 });
 cy.get('#userName-value')
  .click();
 cy.get('.rt-td')
  .contains('Speaking JavaScript').should('exist');
  });

it('Should allow deleting book from collection', () => {
 cy.login(username, password);
 cy.url()
  .should('contain', 'https://demoqa.com/profile');

 cy.get('.menu-list')
  .contains('Profile').click();
 cy.get('.rt-table')
  .should('contain', 'Speaking JavaScript');
 cy.get('#delete-record-undefined > svg')
  .click();
 cy.get('#closeSmallModal-ok')
  .click();
 cy.on('window:confirm', (str) => {
  expect(str).to.equal('Do you want to delete this book?');
});
 cy.get('.rt-td')
  .contains('Speaking JavaScript').should('not.exist');
  });
 })
