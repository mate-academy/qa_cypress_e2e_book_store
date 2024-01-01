/// <reference types='cypress' />


describe('Book Store app', () => {
  const user = {
    username: 'maxtarasov',
    password: '12345Qwert!'
  };

  const books = {
    title: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server',

  };
  
  it('should log in user with valid credantials', () => {
    cy.visit('/login');
    cy.findByPlaceholder('UserName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login').click();
    cy.url().should('include', '/profile');
  });

  it('should allow to add some book', () => {
    cy.logIn();
    cy.visit('/books');
    cy.get('#searchBox').type(books.title);
    cy.contains('.action-buttons', books.title).click();
    cy.get('#description-wrapper').should('contain', books.description);
    cy.get('#author-wrapper').should('contain', books.author);
    cy.get('#publisher-wrapper').should('contain', books.publisher);
    cy.get('.text-right > #addNewRecordButton').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });

  it('should assert "Speaking JavaScript" is in your shopping list', () => {
    cy.logIn();
    cy.visit('/profile');
    cy.get('.profile-wrapper').should('contain', books.title);
    cy.get('.profile-wrapper').should('contain', books.author);
    cy.get('.profile-wrapper').should('contain', books.publisher);
  });

  it.only('delete the book from profile', () => {
    cy.logIn();
    cy.visit('/books');
    cy.get('#searchBox').type(books.title);
    cy.contains('.action-buttons', books.title).click();
    cy.get('.text-right > #addNewRecordButton').click();
    cy.visit('/profile');
    cy.get('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
    })
  });
});
