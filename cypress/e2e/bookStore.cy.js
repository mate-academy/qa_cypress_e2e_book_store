/// <reference types='cypress' />

describe('Book Store app', () => {
  const testData = {
    user: {
      userName: 'Anastasia',
      password: 'Qwerty1!'
    },
    book: {
      name: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: 'O\'Reilly Media',
    },
  };

  it('User can login with valid creds', () => {
    cy.visit('https://demoqa.com/login');

    cy.get('[placeholder="UserName"]')
      .type(testData.user.userName);
    
    cy.get('[placeholder="Password"]')
      .type(testData.user.password);

    cy.get('#login')
      .click();

    cy.get('#userName-value')
      .should('contain', testData.user.userName);
    
    cy.url().should('equal', 'https://demoqa.com/profile');
  });

  it('User can add the book to the favorited', () => {
    cy.login();

    cy.visit('https://demoqa.com/profile');
    cy.get('#gotoStore')
      .click();

    cy.get('[placeholder="Type to search"]')
      .type(testData.book.name);

    cy.contains('a', testData.book.name)
      .click();

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
    });
  })
  it('User can delete the book from favorited', () => {
    cy.login();

    cy.visit('https://demoqa.com/profile');

    cy.get('.rt-tr')
      .should('contain', testData.book.name);

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal('Book deleted.');
    });
  });
});
