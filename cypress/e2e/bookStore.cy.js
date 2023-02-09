/// <reference types='cypress' />

const user = {
  username: 'dazinagu',
  password: 'Passw0rd!',
}

const book = {
  name: 'Speaking JavaScript'
}


describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login')
  });

  it('should provide an ability to login', () => {
    cy.findByPlaceholder('UserName')
      .type(user.username);

    cy.findByPlaceholder('Password')
      .type(user.password);

    cy.get('#login')
      .click();

    cy.url()
      .should('equal', 'https://demoqa.com/profile');

    cy.get('#userName-value')
      .should('contain', user.username);
  });

  it('should provide an ability to add book to the cart', () => {
    cy.login(user.username, user.password);

    cy.visit('https://demoqa.com/profile')

    cy.contains('[id="item-2"]', 'Book Store')
      .click();

    cy.findByPlaceholder('Type to search')
      .type(book.name);

    cy.contains('a', book.name)
      .click();

    cy.contains('#description-wrapper', 'Description')
      .should('contain', 'Like it or not, JavaScript is everywhere');

    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });

  it('should provide an ability to delete book from the cart', () => {
    cy.login(user.username, user.password);

    cy.visit('https://demoqa.com/profile');

    cy.get('#delete-record-undefined')
        .click();
      
    cy.get('#closeSmallModal-ok')
        .click();

    cy.get('.rt-noData')
        .should('contain', 'No rows found');
    })
  });
