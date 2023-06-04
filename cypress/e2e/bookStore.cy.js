/// <reference types='cypress' />

const testData = {
  user: {
    username: 'PipiDodo',
    password: '!PipiDodo123'
  },
  book: {
    name: 'Speaking JavaScript',
    description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o'
  },
  alerts: {
    bookAdded: 'Book added to your collection.',
    bookDeleted: 'Book deleted.'
  }
};


describe('Book Store app', () => {
  before(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('user is able to login', () => {
    const username = 'PipiDodo';
    const password = '!PipiDodo123';

    cy.get('#userName')
      .type(username);

    cy.get('#password')
      .type(password);

    cy.get('#login')
      .click();

    cy.get('#userName-value')
      .should('contain', username);

    cy.url()
      .should('eq', 'https://demoqa.com/profile');
  });

  it('user is able to add book to collection', () => {
    cy.login(testData.user.username, testData.user.password);

    cy.visit('https://demoqa.com/profile');

    cy.contains('#item-2', 'Book Store')
      .click();

    cy.get('#searchBox')
      .type('Speaking JavaScript');

    cy.contains('a', 'Speaking JavaScript')
      .click();

    cy.get('#description-wrapper')
      cy.should('contain.text', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o');

    cy.contains('button', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`);
    });
  });

  it('user is able to delete book from collection', () => {
    cy.login(testData.user.username, testData.user.password);

    cy.visit('https://demoqa.com/profile');

    cy.contains('#item-3', 'Profile')
      .click();
    
    cy.contains('.ReactTable', 'Speaking JavaScript')
      .should('exist');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
    });

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`);
  });

  });
 
