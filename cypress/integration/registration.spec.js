/// <reference types='cypress' />

describe('QA_DEC21', () => {
  const user = {
    username: 'Adam',
    password: '12345Qwert!'
  };

  const book = {
    name: 'Speaking JavaScript',
    author: 'Axel Rauschmayer',
    publisher: `O'Reilly Media`
  };

  beforeEach(() => {
    cy.login();
  });

  it('Successfully login', () => {
    cy.get('#userName-value')
      .should('contains', user.username);
  });

  it('Go to the list of books and add the book to the collection', () => {
    cy.visit('/profile');
    cy.contains('#item-2', 'Book Store').click();
    cy.findByPlaceholder('Type to search').type(book.name);
    cy.contains('.rt-tr.-odd', book.name)
    cy.get('[id="see-book-Speaking JavaScript"]').click();
    cy.contains('#addNewRecordButton', 'Add To Your Collection').click({force: true});//

    cy.on('window:alert', alert => {
      expect(alert).to.equal('Book added to your collection.');
    });
  });

  it.only('Delete selected book from account', () => {
    cy.visit('/profile');
    cy.contains('.rt-tr.-odd', book.name)
    cy.contains('.rt-tr.-odd', book.name).find('#delete-record-undefined').click();
    cy.get('#closeSmallModal-ok').click();

    cy.on('window:alert', alert => {
      expect(alert).to.equal('Book deleted.');
    });
  });
});
