/// <reference types='cypress' />

const alertMssage = {
  added: 'Book added to your collection.',
  deleteBook: 'Do you want to delete this book?'
};

const user = {
  username: 'IrynaQA',
  password: 'Qwerty!&1'
};
const book = {
  title: 'Speaking JavaScript',
  author: 'Axel Rauschmayer',
  publisher: 'O\'Reilly Media',
  description: ''
};
describe('Book Store app', () => {
  before(() => {
    cy.visit('/login');
});

  it('', () => {
    cy.get('#userName')
    .type(user.username),
    cy.get('#password')
    .type(user.password)
    cy.get('#login')
      .click()
    cy.url()
      .should('include', '/profile');
    cy.get('[id="userName-value"]')
      .should('contain', user.username);
  });


  it('', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile')
    cy.get('#gotoStore')
      .click(); 
    cy.get('#searchBox')
      .type(book.title);
    cy.contains('[role="row"]', book.title)
      .should('contain', book.author)
      .and('contain', book.publisher);
    cy.get('.action-buttons')
      .click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection')
      .click();
    cy.on('window:alert', (alert) =>{
      expect(alert).to.equal(alertMssage.added);
    })
  });

  it('', () => {
    cy.login(user.username, user.password);
    cy.visit('/profile');
    cy.contains('#item-3', 'Profile')
      .click();
    cy.contains('.rt-tbody', book.title)
    cy.get('#delete-record-undefined')
      .click();
    cy.get('#closeSmallModal-ok')
    .click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.equal(alertMssage.deleteBook)
    })
  });

});
