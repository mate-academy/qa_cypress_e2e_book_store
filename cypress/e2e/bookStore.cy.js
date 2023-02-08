/// <reference types='cypress' />

describe('Book Store app', () => {
  const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: 'O\'Reilly Media',
    description: 'Like it or not, JavaScript is everywhere',
  }

  it('should log in user', () => {
    cy.registerNewUser().then(user => {
      cy.visit('/login');

      cy.findById('userName')
        .type(user.username);

      cy.findById('password')
        .type(user.password);

      cy.findById('login')
        .click();

      cy.url()
        .should('include', '/profile');

      cy.findById('userName-value')
        .should('have.text', user.username);
    })
  });

  it('should add the book', () => {
    cy.registerNewUser().then(user => {
      cy.request('POST', '/Account/v1/Login', user)
        .then(response => {
          cy.setCookie('userName', response.body.username);
          cy.setCookie('userID', response.body.userId);
        })
      cy.request('POST', '/Account/v1/GenerateToken', user)
        .then(response => {
          cy.setCookie('token', response.body.token);
          cy.setCookie('expires', response.body.expires);
        })
      });
    
    cy.visit('/books');

    cy.findById('searchBox')
      .type(book.name);

    cy.contains('a', book.name)
      .click();

    cy.findById('description-wrapper')
      .should('contain', book.description);

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.checkAddPopUp();

    cy.visit('/profile');

    cy.contains('[role="row"]', book.name)
      .should('contain', book.author)
      .and('contain', book.publisher);
  });

  it('should delete the book', () => {
    cy.registerNewUser().then(user => {
      cy.request('POST', '/Account/v1/Login', user)
        .then(response => {
          cy.setCookie('userName', response.body.username);
          cy.setCookie('userID', response.body.userId);
        })
      cy.request('POST', '/Account/v1/GenerateToken', user)
        .then(response => {
          cy.setCookie('token', response.body.token);
          cy.setCookie('expires', response.body.expires);
        })
      });

    cy.visit('/books');

    cy.findById('searchBox')
      .type(book.name);

    cy.contains('a', book.name)
      .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.visit('/profile');

    cy.findById('delete-record-undefined')
      .click();

    cy.findById('closeSmallModal-ok')
      .click();

    cy.checkDeletePopUp();

    cy.get('.rt-noData')
      .should('contain', 'No rows found');
  });
});
