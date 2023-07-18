/// <reference types='cypress' />

describe('Book Store app', () => {
  const user = {
    username: 'Aivan12',
    password: 'XB5mfkjyNQqVXyZ@'
  };

  const book = {
    title: 'Speaking JavaScript',
    author: 'Alex Rauschmayer',
    isbn: '9781449365035',
    description: 'Like it or not, JavaScript is everywhere'
  };
  before(() => {
    cy.visit('/login');
  });

  it('slould allow to login', () => {
    cy.get('#userName').type(user.username);
    cy.findByPlaceholder('Password').type(user.password);
    cy.get('#login')
      .click();
    cy.get('#userName-value').should('contain', user.username);
    cy.url().should('include', '/profile');

    cy.visit('/profile');

    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2 > .text')
      .click();
    cy.findByPlaceholder('Type to search').type(book.title);
    cy.contains(book.title)
      .click();

    cy.get('#title-wrapper').should('contain', book.title);
    cy.get('#ISBN-wrapper').should('contain.text', book.isbn);
    cy.get('#description-wrapper').should('contain.text', book.description);

    cy.get('.text-right > #addNewRecordButton')
      .click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`);
    });

    cy.visit('/profile');

    cy.get('a', book.booktitle).should('be.visible');

    cy.get('.action-buttons', book.booktitle).find('[title = "Delete"]')
      .click();

    cy.get('#closeSmallModal-ok').click();
  });
});
