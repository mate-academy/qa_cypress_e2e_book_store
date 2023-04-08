/// <reference types='cypress' />
import { faker } from '@faker-js/faker'

const {generateUser} = require('../support/generateUser');

describe('Login', () => {
  beforeEach(() => {
    cy.viewport(550, 750)
    cy.visit('https://demoqa.com/login');
  });

  it('should contain Login form', () => {
    cy.findByPlaceholder('UserName').should('exist');
    cy.findByPlaceholder('Password').should('exist');
    cy.findById('newUser').should('contain.text', 'New User');
    cy.findById('login').should('contain.text', 'Login');
  });

  it('should provide the ability successfuly login with valid data', () => {
    cy.registerUser().then((user) => {
      cy.findByPlaceholder('UserName').type(user.userName);
      cy.findByPlaceholder('Password').type(user.password);
      cy.findById('login').click();
      cy.findById('userName-value').should('contain.text', user.userName);
      cy.url('https://demoqa.com/profile')
    });
  });

  it('should not provide the ability successfuly login with wrong username', () => {
    const wrongUsername = faker.internet.userName();

    cy.registerUser().then((user) => {
      cy.findByPlaceholder('UserName').type(wrongUsername);
      cy.findByPlaceholder('Password').type(user.password);
      cy.findById('login').click();
      cy.contains('p', 'Invalid username or password!')
        .should('exist')
        .and('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  it('should not provide the ability successfuly login with wrong password', () => {
    const wrongPassword = 'TestUser1';

    cy.registerUser().then((user) => {
      cy.findByPlaceholder('UserName').type(user.userName);
      cy.findByPlaceholder('Password').type(wrongPassword);
      cy.findById('login').click();
      cy.contains('p', 'Invalid username or password!')
        .should('exist')
        .and('be.visible')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});

describe('Add book', () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.viewport(550, 750)
  });

  it('should provide the ability to add the book to the collection ', () => {
    cy.login().then(() => {
      cy.visit('https://demoqa.com/books');
      cy.findByPlaceholder('Type to search')
        .should('exist')
        .type('Speaking JavaScript')
      cy.contains('a', 'Speaking JavaScript').click();
      cy.contains('button', 'Add To Your Collection').click();
      cy.on('window:alert', (message) => { 
        expect(message).to.equal('Book added to your collection.')
        }); 
    })
  });

  after(() => {
    cy.login().then(() => {
      cy.visit('https://demoqa.com/profile');
      cy.contains('a', 'Speaking JavaScript').should('exist').and('be.visible');
      cy.findById('delete-record-undefined').click();
      cy.contains('button', 'OK').click();
      cy.on('window:alert', (message) => { 
        expect(message).to.equal('Book deleted.')
        }); 
    })
  })
});

describe('Unsuccessful add book', () => {
  before(() => {
    cy.clearCookies();
    cy.viewport(550, 750)
    cy.login().then(() => {
      cy.visit('https://demoqa.com/books');
      cy.findByPlaceholder('Type to search')
        .should('exist')
        .type('Speaking JavaScript')
      cy.contains('a', 'Speaking JavaScript').click();
      cy.contains('button', 'Add To Your Collection').click();
    })
  });

  it('should not provide the ability to add already added book ', () => {
    cy.login().then(() => {
      cy.visit('https://demoqa.com/books');
      cy.findByPlaceholder('Type to search')
        .should('exist')
        .type('Speaking JavaScript')
      cy.contains('a', 'Speaking JavaScript').click();
      cy.contains('button', 'Add To Your Collection').click();
      cy.on('window:alert', (message) => { 
        expect(message).to.equal('Book already present in the your collection!')
        });
    })
  });
});

describe('Delete books from collection', () => {
  before(() => {
    cy.viewport(550, 750);
    cy.clearCookies();
    cy.login().then(() => {
      cy.visit('https://demoqa.com/books');
      cy.findByPlaceholder('Type to search')
        .should('exist')
        .type('Speaking JavaScript')
      cy.contains('a', 'Speaking JavaScript').click();
      cy.contains('button', 'Add To Your Collection').click(); 
    })
  });

  it('should provide the ability to delete book from collection ', () => {
    cy.login().then(() => {
      cy.visit('https://demoqa.com/profile');
      cy.contains('a', 'Speaking JavaScript').should('exist').and('be.visible');
      cy.findById('delete-record-undefined').click();
      cy.contains('button', 'OK').click();
      cy.on('window:alert', (message) => { 
        expect(message).to.equal('Book delated.')
        });
    })
  });
});