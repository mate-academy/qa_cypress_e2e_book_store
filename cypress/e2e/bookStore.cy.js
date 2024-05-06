/// <reference types='cypress' />

const user = {
  username: 'Anatolii Tsimbaliuk',
  password: 'Qwert12345!',
};


const title = 'Speaking JavaScript';
const author = 'Axel Rauschmayer';
const publisher = "O'Reilly Media";

describe('Book Store app', () => {
  it('should provide an opportunity to login', () => {
    cy.visit('/login');
    cy.login(user.username, user.password, 'login');
    cy.contains('label', user.username).should('exist');
    cy.url().should('include', '/profile');
  });

  it.only('should provide the ability for searching books', () => {
    cy.apiLogin(user.username, user.password);
    cy.visit('/books');
    cy.findBySelector('searchBox').type(title);
    cy.findByClass('rt-td')
      .should('contain', title)
      .and('contain', author)
      .and('contain', publisher);
  });
});
  