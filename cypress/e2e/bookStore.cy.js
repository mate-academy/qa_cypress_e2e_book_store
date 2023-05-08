describe('Book Store app', () => {
  it('should allow a user to log in', () => {
    cy.visit('/login');

    cy.findByPlaceholder('UserName').type('Olya');
    cy.findByPlaceholder('Password').type('Test123*');

    cy.contains('button', 'Login').click();

    cy.url().should('include', '/profile');

    cy.get('#userName-value').should('contain.text', 'Olya');
  });

  it('should allow user to add a book', () => {
    cy.login();
    cy.visit('/profile');

    cy.get('#gotoStore').click();

    cy.get('#searchBox').type('Speaking JavaScript');

    cy.contains('a', 'Speaking JavaScript').click();

    cy.get('#description-wrapper #userName-value').should('exist');

    cy.contains('button', 'Add To Your Collection').click({force: true});

    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Book added to your collection.`)
    });
  });

  it('should allow user to delete a book', () => {
    cy.login();
    cy.visit('/profile');

    cy.contains('a', 'Speaking JavaScript').should('exist');
  
    cy.get('#delete-record-undefined').click();

    cy.get('#closeSmallModal-ok').click();
  });
});
