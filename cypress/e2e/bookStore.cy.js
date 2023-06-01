/// <reference types='cypress' />



describe('Book Store app', () => {
  beforeEach(() => {
    cy.visit('/login'); 
  });
  const uName = 'DenShy';
  const uPass = 'Qwert!23' 
  const book = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media'
  }
  

it('User is able to login', () => {
    cy.findPlaceholder('UserName').type(uName);
    cy.findPlaceholder('Password').type(uPass);
    cy.get('#login').click();
    cy.contains('#userName-value', uName);
    cy.url().should('include', '/profile');
  });

it('User is able to search the book and add it to cart', () => {
    cy.login(uName,uPass);
    cy.contains('#item-2', 'Book Store').click();
    cy.findPlaceholder('Type to search').type(book.title);
    cy.contains('[role="row"]', book.title)
     .should('contain', book.author)
     .and('contain', book.publisher);
    cy.contains('a', book.title).click();
    cy.contains('.books-wrapper', book.title)
     .should('contain', book.author)
     .and('contain', book.publisher);
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
     .click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
  });
});

  it('User is able to delete the book from cart', () => {
    cy.login(uName,uPass);
    cy.visit('/profile'); 
    cy.contains('[role="row"]', book.title)
     .should('contain', book.author)
     .and('contain', book.publisher);
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
  });
  });
});
