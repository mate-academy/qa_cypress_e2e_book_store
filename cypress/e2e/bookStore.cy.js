/// <reference types='cypress' />

const user = {
  username: 'Anatolii Tsimbaliuk',
  password: 'Qwert12345!',
};

const textForSearch = 'Speaking JavaScript';
const title = 'Speaking JavaScript';
const author = 'Axel Rauschmayer';
const publesher = "O'Reilly Media";

describe('Book Store app', () => {
  it('should provide an opportunity to login via UI', () => {
    cy.visit('/login');
    cy.loginViaUi(user.username, user.password, 'login');
    cy.contains('label', user.username).should('exist');
    cy.url().should('include', '/profile');
  });

  it.only('should provide an opportunity to search books', () => {
    cy.loginViaApi(user.username, user.password);
    cy.visit('/books');
    cy.findById('searchBox').type(textForSearch);
    cy.findByClass('rt-td')
      .should('contain', title)
      .and('contain', author)
      .and('contain', publesher);
  });
});
  