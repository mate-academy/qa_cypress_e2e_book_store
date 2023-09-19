/// <reference types='cypress' />

const username = 'July23max$' ;
const password = 'July23max$' ;
const book = {
  title: 'Speaking JavaScript',
  subTitle: 'An In-Depth Guide for Programmers',
  author: 'Axel Rauschmayer', 
  publisher: 'O\'Reilly Media',
  description: 'Like it or not, JavaScript is everywhere these',
};

describe('Book Store app', () => {
  before(() => {
cy.visit('https://demoqa.com/login')
  });

it('successfull log in', () => {
    cy.get('#userName').type(username);
    cy.get('#password').type(password);
    cy.get('#login').click();
    cy.url().should('contain', 'profile');
    cy.get('#books-wrapper #submit').should('exist')
    cy.get('#books-wrapper #submit').should('contain','Log out')
  });

  it.only('add a book', () => {
    cy.login(username, password);
    cy.url().should('contain', 'profile');

    cy.get('.menu-list #item-2').contains('Book Store').click();
    cy.url().should('contain', 'books');
    cy.get('#searchBox').type(book.title);

    cy.get('#basic-addon2').click();
    cy.get('a[href="/books?book=9781449365035"]').click();
    cy.get('#description-wrapper > .col-md-9 > #userName-value').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click({ force: true });

    cy.window().then((win) => {
      win.close();
    });

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-0').click();
    cy.get('a[href="/profile"]').click();
    cy.get('.rt-tbody .rt-tr').should('contain', book.title);
    cy.get('.buttonWrap > .text-right > #submit').click({ force: true });
    cy.get('#closeSmallModal-ok').should('be.visible');
    cy.get('#closeSmallModal-ok').click();
    cy.window().then((win) => {
      win.close();
    });
  });
});
