/// <reference types='cypress' />


const user = {
  username: 'MS',
  password: 'Bring2005@'
}

const book = {
  title:'Speaking JavaScript',
  description: 'Like it or not, JavaScript is everywhere these days-from browser to server to mobile-and now you, too, need to learn the language or dive deeper than you have. This concise book guides you into and through JavaScript, written by a veteran programmer who'

}

describe('Book Store app', () => {
  beforeEach(() => {
    cy.viewport(1100, 1100);
  });

  it('should provide ability to delete book from your list', () => {
    cy.visit('/login')
    cy.get('#userName').type(user.username)
    cy.get('#password').type(user.password)
    cy.get('#login').click()
    cy.url().should('include','/profile')
    cy.get('#userName-value').should('have.text',user.username)
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-2').click()
    cy.get('#searchBox').type(book.title)
    cy.contains('a', book.title).click()
    cy.contains('#description-wrapper','Description').should('contain', book.description)
    cy.contains('button','Add To Your Collection').click()
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
  });
    cy.get(':nth-child(6) > .element-list > .menu-list > #item-3').click()
    cy.contains('a', book.title).should('contain', book.title)
    cy.get('#delete-record-undefined').click()
    cy.get('#closeSmallModal-ok').click()
  });
});
