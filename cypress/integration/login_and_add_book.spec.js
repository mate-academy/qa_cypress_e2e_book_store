/// <reference types='cypress' />

const user = {
  userName: 'JohnQA',
  password: 'Qa1@345678',
  userFavBook: 'Speaking JavaScript',
  userFavBookID: 'Speaking\\ JavaScript'
}

describe('User can', () => {
  beforeEach(() => {
    cy.login(user.userName, user.password)
  });

  it('login in account', () => {
   cy.url().should('include', '/login');
  });

  it('check username after login', () => {
    cy.get('#userName-value').should('have.text', (user.userName));
  });

  it('navigate to books list', () => {
    cy.get('#gotoStore').click({force: true});
  });

  it('search "Speaking JavaScript" in books list', () => {
    cy.get('#searchBox').type(`${user.userFavBook}{enter}`);
  });

  it('add "Speaking JavaScript" in your shopping list', () => {
    cy.addBook(user.userFavBook, user.userFavBookID);
  });

  it('delete Speaking JavaScript book from your list', () => {
    cy.addBook(user.userFavBook, user.userFavBookID);
    cy.delBook(user.userFavBookID)
  });
});
