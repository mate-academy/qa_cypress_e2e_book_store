/// <reference types="cypress" />

describe('Login test', () => {
    //const user = {
//        username: 'Kurt_Volker',
       //pass: 'Qwerty123!'
    //};

    //const book = {
        //name: 'Speaking JavaScript',
        //author: 'Axel Rauschmayer',
        //published: `O'Reilly Media`
    //};

beforeEach(() =>{
    cy.login();
    /*
    cy.visit('/login');
    cy.get('#userName').type(user.username);
    cy.get('#password').type(user.pass);
    cy.get('#login').click();
    cy.url().should('include', '/profile');*/
});


    it('Successfully login', () =>{
        cy.get('#userName-value').should('contain', 'Kurt_Volker');
    });
    it('Find the book and add it to collection', () => {
        //cy.get('#item-2').click();
        cy.visit('/books');
        cy.get('#searchBox').type('Speaking JavaScript{enter}');
        cy.contains('.rt-tr-group', 'Speaking JavaScript')
        .should('contain.text', 'Axel Rauschmayer')
        .and('contain.text', `O'Reilly Media`);
        cy.get('[id="see-book-Speaking JavaScript"]').click();
        cy.get('#ISBN-wrapper').should('contain', '9781449365035');
        cy.contains('#addNewRecordButton', 'Add To Your Collection').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Book added to your collection.`)
           })
    });
    it('Remove book from collection', () => {
        cy.visit('/profile');
        //cy.contains('#item-3', 'Profile').click();
        cy.get('.rt-tbody').should('contain', 'Speaking JavaScript');
        cy.contains('.rt-tr-group', 'Speaking JavaScript')
        .find('#delete-record-undefined').click();
        cy.get('#closeSmallModal-ok').click();
    })
});