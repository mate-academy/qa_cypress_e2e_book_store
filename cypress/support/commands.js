Cypress.Commands.add('login', (userName = 'Tester1337', password = 'Tester!337') => {
    cy.request({
        method: 'POST',
        url: 'https://demoqa.com/Account/v1/Login',
        body: {
            userName: userName,
            password: password,
        },
    }).then((response) => {
        cy.setCookie('token', response.body.token);
        cy.setCookie('userID', response.body.userId);
        cy.setCookie('expires', response.body.expires);
        cy.setCookie('userName', response.body.username);
    });
});
