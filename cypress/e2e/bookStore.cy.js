// <reference types='cypress' />
describe('Book Store app', () => {
  const user = {
    name: 'Zakhar',
    password: 'Zakhar123!'
  };

  before(() => {
    cy.visit('/login');
  });

  it('should log in user', () => {
    cy.get('#userName').type(user.name);
    cy.get('#password').type(user.password);
    cy.get('button#login').click();
    cy.get('#userName-value').should('contain', user.name);
  });

  it('should find a book', () => {
    const bookName = 'Speaking JavaScript';
    const authorName = 'Axel Rauschmayer';
    const publisher = 'O\'Reilly Media';

    cy.login(user);

    cy.visit('/books');

    cy.get('#searchBox').type(bookName);

    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(2)')
      .should('contain.text', bookName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(3)')
      .should('contain.text', authorName);
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(4)')
      .should('contain.text', publisher);
  });
});
