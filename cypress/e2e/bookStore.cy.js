/// <reference types='cypress' />

const {generateUser} = require('../support/generateUser');

describe('Login', () => {
  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should contain Login form', () => {
    cy.findByPlaceholder('UserName').should('exist');
    cy.findByPlaceholder('Password').should('exist');
    cy.findById('newUser').should('contain.text', 'New User');
    cy.findById('login').should('contain.text', 'Login');
  });

  it('should provide the ability successfuly login', () => {
    cy.registerUser().then((user) => {
      cy.findByPlaceholder('UserName').type(user.userName);
      cy.findByPlaceholder('Password').type(user.password);
      cy.findById('login').click();
      cy.findById('userName-value').should('contain.text', user.userName);
      cy.url('https://demoqa.com/profile')
    });
  });
});

describe('Add book', () => {
  beforeEach(() => {
    cy.viewport(550, 750)
    cy.clearCookies();
    cy.visit('https://demoqa.com/books');
  });

  it('should provide the ability to add the book to the collection ', () => {
    cy.registerUser().then((user) => {
      cy.findByPlaceholder(`Type to search`).type('Speaking JavaScript')
      cy.findById('basic-addon2').click();
      cy.contains('a', 'Speaking JavaScript').click();
      cy.findById('login').click();
      cy.findByPlaceholder('UserName').type(user.userName);
      cy.findByPlaceholder('Password').type(user.password);
      cy.findById('login').click();
      cy.wait(500);
      cy.contains('button', 'Add To Your Collection').click();
      cy.on('window:alert', (message) => { 
      expect(message).to.equal('Book added to your collection.')
      })
    });
  });
});

describe('Delete books from collection', () => {
  beforeEach(() => {
    cy.viewport(550, 750)
    cy.clearCookies();
    cy.visit('https://demoqa.com/books');
  });

  it('should provide the ability to delete added book from collection', () => {
    cy.registerUser().then((user) => {
      cy.findByPlaceholder(`Type to search`).type('Speaking JavaScript')
      cy.findById('basic-addon2').click();
      cy.contains('a', 'Speaking JavaScript').click();
      cy.findById('login').click();
      cy.findByPlaceholder('UserName').type(user.userName);
      cy.findByPlaceholder('Password').type(user.password);
      cy.findById('login').click();
      cy.wait(500);
      cy.contains('button', 'Add To Your Collection').click();
      cy.visit('https://demoqa.com/profile');
      cy.contains('a', 'Speaking JavaScript').should('exist').and('be.visible');
      cy.findById('delete-record-undefined').click();
      cy.contains('button', 'OK').click();
      cy.on('window:alert', (message) => { 
        expect(message).to.equal('Book deleted.')
        })
      cy.contains('a', 'Speaking JavaScript').should('not.exist')
    })
  });
});
