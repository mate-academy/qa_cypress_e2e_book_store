const username = 'YUrii'
const password = 'Qwerty1/!'

describe('User should be able to', () => {
  before(() => {
    cy.visit('/login')
  });

  it.skip('Logged in user should add to Your collection a book', () => {

    cy.get('[placeholder="UserName"]')
      .type(username);
    
    cy.get('[placeholder="Password"]')
      .type(password);
    
    cy.get('[id="login"]')
      .click();

    cy.get('[id="userName-value"]')
      .should('contain.text', 'YUrii');
    
    cy.url()
      .should('include', '/profile');

    cy.contains('[id="item-2"]', 'Book Store')
      .click({force: true});

    cy.get('[placeholder="Type to search"]')
      .type('Speaking JavaScript')

    cy.get('[href="/books?book=9781449365035"]')
      .click();
    
    cy.get('[id="description-wrapper"]')
      .should('contain.text', 'Like it or not, JavaScript is everywhere')

    cy.contains('Add To Your Collection')
      .click({force: true});

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    })
  });
  // Advanced level
  it('Login', () => {
    cy.login();

    cy.visit('/profile');
  
    cy.get('[id="userName-value"]')
      .should('contain.text', 'YUrii');
  });
  
  it('add book', () => {
    cy.login();

    cy.visit('/books?book=9781449365035');

    cy.get('.text-right')
      .contains('Add To Your Collection')
      .click({force: true});
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Book added to your collection.')
    });

  });

  it('delete book', () => {
    cy.login();
     
    cy.visit('/profile');
    
    cy.get('[title="Delete"]')
      .click();
    
    cy.get('[id="closeSmallModal-ok"]')
      .click();
  });

});
