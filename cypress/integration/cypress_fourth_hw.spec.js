describe('Homework 36.Basic', () => {
    const info = {
        username: 'MBuryak',
        password: 'Qwerty123!',
        bookName: 'Speaking JavaScript',
        author: 'Axel Rauschmayer',
        publisher: `O'Reilly Media`,
        bookAdd: 'Add To Your Collection',
    };

    beforeEach(() => {
        cy.login();
    });
    
    it('Steps 1-7', () => {        
        cy.get('#userName-value').should('contain', info.username);
        cy.contains('[class="btn btn-light "]', 'Book Store').click();
        cy.get('#searchBox').type(info.bookName);
        cy.contains('[class="mr-2"]', info.bookName).click();
        cy.contains('#addNewRecordButton', info.bookAdd).click();
        cy.on('window:alert', (str) => {
                expect(str).to.equal(`Book added to your collection.`)
            })                    
    })
          
    it('Steps 8-10', () => {                          
        cy.get('[class="rt-tr -odd"]').contains(info.bookName).should('exist');
        cy.get('[class="rt-tr -odd"]').contains(info.author).should('exist');
        cy.get('[class="rt-tr -odd"]').contains(info.publisher).should('exist');
        cy.get('#delete-record-undefined').click();
        cy.get('#closeSmallModal-ok').click();
        cy.on('window:alert', (str) => {
            expect(str).to.equal(`Book deleted.`)
            })               
    })   
})  