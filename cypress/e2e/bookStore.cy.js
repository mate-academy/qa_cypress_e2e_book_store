/// <reference types='cypress' />
 
describe('Book Store app', () => {
  const testData = {
    user: {
      username: 'diablo4',
      password: 'Lilyth4!',
    },
    book: {
      title: 'Speaking JavaScript',
      author: 'Axel Rauschmayer',
      publisher: "O'Reilly Media",
    },
  };

  beforeEach(() => {
    cy.visit('https://demoqa.com/login');
  });

  it('should login the user', () => {
    cy.get('#userName')
     .type(testData.user.username);

    cy.get('#password')
      .type(testData.user.password);

    cy.contains('button', 'Login')
      .click();

    cy.get('#userName-value')
      .should('contain', testData.user.username);

    cy.url()
      .should('include', 'https://demoqa.com/profile');
  });

  it('should add the book to the profile', () => {
    cy.login(testData.user.username, testData.user.password);
    cy.visit('https://demoqa.com/profile');
    
    cy.contains('#item-2', 'Book Store')
      .click();

    cy.get('#searchBox')
      .type(testData.book.title);

    cy.contains('a', testData.book.title)
      .click();

    cy.contains('.form-label', 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who o')
      .should('exist');

    cy.contains('button', 'Add To Your Collection')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });

  it('should delete the book from the ', () => {
    cy.login(testData.user.username, testData.user.password);

    cy.visit('https://demoqa.com/profile');

    cy.contains('.ReactTable', testData.book.title)
      .should('exist');

    cy.get('#delete-record-undefined')
      .click();

    cy.get('#closeSmallModal-ok')
      .click();
  });
});
