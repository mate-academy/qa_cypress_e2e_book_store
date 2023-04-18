/// <reference types='cypress' />

// const { should } = require("chai");
// import { should } from 'chai';
import { user } from '../support/testData';

describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
    
  });

  it('login', () => {
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.password);
    cy.get('#login').click();
    cy.get('.form-label').should('contain.text', 'iziumova');
    cy.url().should('eq', 'https://demoqa.com/profile');
  

  });

  it('add book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#gotoStore').should('contain.text', 'Go To Book Store').click();
    cy.get('#searchBox').type('Spea{enter}');
    cy.get('a[href="/books?book=9781449365035"]').click();
    // cy.get('.form-label').should('contain.text', '9781449365035');
    // cy.get('.form-label').should('contain.text', 'Speaking JavaScript');
    // cy.get('.form-label').should('contain.text','An In-Depth Guide for Programmers');
    // cy.get('.form-label').should('contain.text','Axel Rauschmayer');
    cy.get('.form-label').should('contain.text','Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');
    cy.get('.text-right > #addNewRecordButton').click();
  //   cy.on('window:alert', (str) => {
  //     expect(str).to.equal(`Book added to your collection.`)
  // });
    cy.visit('/profile');
  
  });

  it('delete book', () => {
    cy.login();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    
    });
});
