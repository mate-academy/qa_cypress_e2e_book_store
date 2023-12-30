/// <reference types='cypress' />

describe('Book Store app', () => {

  const user = {
    username:'cat',
    password: 'Qwerty!1'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you'

  };

  it('should provide an ability to log in', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
    cy.get('#userName-value').should('contain', user.username);
  });

  it('should allow to searchfor the book and add to collection', () => {
    cy.login ();
    
    cy.visit('/books');
   
    cy.get('#searchBox').type(book.title);
    cy.contains('[role="row"]', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.get('a').contains(book.title).click();
    cy.get('#description-wrapper').should('contain', book.description);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (alert) => {
     expect(alert).to.equal('Book added to your collection' );
     
    });
  });

  it('should allow to go to user profile and delete book from list', () => {     
    cy.login ();
    
    cy.visit('/profile');
    
    cy.contains('[role="row"]', book.title).should('contain', book.author).and('contain', book.publisher);
    cy.request('DELETE', 'https://demoqa.com/BookStore/v1/Book');
    cy.contains('.modal-body', 'Do you want to delete this book?').click('#closeSmallModal-ok');
    cy.on('window:alert', (alert) => {
     expect(alert).to.equal('Book deleted.' );
    cy.contains('[role="row"]', book.title).should('not contain', book.author).and('not contain', book.publisher);


    });
  });
});
