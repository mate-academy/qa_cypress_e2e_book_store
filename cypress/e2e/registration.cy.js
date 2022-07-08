/// <reference types='cypress' />
describe('Registrate user should be able', () => {
  const bookName = 'Speaking JavaScript'
  beforeEach(() => {
    cy.login()
  });
 
  it('Check username after login', () => {
    cy.get('#userName-value').should('contain', 'AnnQ')
});

it('Navigate to books list, Type into search field "Speaking JavaScript" click on link', () => {
  cy.visit('/books')
  cy.findByPlaceholder('Type to search')
  .type(bookName)
  cy.contains('a', bookName)
  .click()
});

it('Click on [Add To Your Collection] button Confirm popup.', () => {
  cy.visit('/books?book=9781449365035')
  cy.contains('#addNewRecordButton', 'Add To Your Collection').click()
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book added to your collection.`)
})
});

it('Open profile page, Assert "Speaking JavaScript" in shopping list, Delete book from your list', () => {
  cy.visit('/profile')
  cy.get('.ReactTable').should('contain', 'Axel Rauschmayer')
  .and('contain', bookName)
  cy.contains('.rt-tr.-odd', bookName)
  .find('[title = "Delete"]').click()
  cy.get('[id="closeSmallModal-ok"')
  .click()
  cy.on('window:alert', (str) => {
    expect(str).to.equal(`Book deleted.`)  
})

})
})

