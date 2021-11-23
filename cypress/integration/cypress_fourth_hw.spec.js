/// <reference types="cypress" />

describe('should login', () => {
const user = {
    username: 'Pupka',
    password: 'Pupka@123'
};

 const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: `O'Reilly Media`
 }

beforeEach(() => {
cy.login();
})

it('should goes into Book Store and add book', () => {

cy.contains('.text', 'Book Store')
.click();

cy.url()
.should('include', '/books');

cy.get('#userName-value')
.contains('Pupka')
.should('exist');

cy.get('#searchBox.form-control')
.type(book.name);

cy.contains('.rt-tr.-odd',book.name)
.should('contain', book.author)
.and('contain', book.publisher);

cy.contains('[href]', book.name)
.click();

cy.contains('#addNewRecordButton', 'Add To Your Collection')
.click();

cy.on('window:alert', (str) => {
expect(str).to.equal(`Book added to your collection.`)
})
});

it('should go into profile and delete book', ()=> {
cy.contains('.text', 'Profile')
.click();

cy.contains('.main-header', 'Profile')
.should('exist');

cy.get('[title="Delete"]')
.click();

cy.get('#closeSmallModal-ok')
.click();

cy.on('window:alert', (str) => {
expect(str).to.equal(`Book deleted.`)
})
})
});