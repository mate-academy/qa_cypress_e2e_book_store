Cypress.Commands.add('login', (username, password) => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Login',
        body: {
            userName: "stadnyk_qa_jan23",
            password: "1234Qwerty&",
        },
    }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('userName', response.body.username);
    });
});

/*
Cypress.Commands.add('addBook', () => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/BookStore/v1/Books',
        body: {
            userId: "ab18ccc8-14d6-46b1-95a2-776fb1473294",
            collectionOfIsbns: [
                {
                    isbn: "9781449365035"
                }
            ]
        }
    }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('userName', response.body.username);
    });
})
*/