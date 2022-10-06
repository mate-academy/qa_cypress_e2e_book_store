/// <reference types='cypress' />

describe('Login, add/delete a book flow', () => {

  const user = {
    username: 'ValidUser',
    password: 'Pa$$word123'
  };

  beforeEach('login', () => {
    cy.loginByRequest(user.username, user.password);
  });

  it('successful login', () => {
    cy.get('[id="userName-value"]')
    .should('contain', user.username)
  });

  it('search a book and add to collection', () => {
    cy.contains('[id=item-2]', 'Book Store')
    .click()
    cy.get('[id=searchBox]')
    .type('speaking javascript')
    cy.get('[id="see-book-Speaking JavaScript"]').click()
    cy.get('[id="addNewRecordButton"]')
    .contains('Add To Your Collection')
    .click({force: true})

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  })
  })

  it('delete a book from collection', () => {
    cy.get('.rt-td')
    .contains('Speaking JavaScript')
    .get('#delete-record-undefined').click()
    .get('#closeSmallModal-ok').click()

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book deleted.`)
  })
  })
});