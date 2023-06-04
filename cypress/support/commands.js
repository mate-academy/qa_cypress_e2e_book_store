Cypress.Commands.add('loginAPI', (username, password) => {
    cy.request('POST', 'https://demoqa.com/Account/v1/Login', { userName: username, password: password })
        .then((response) => {
            cy.setCookie('token', response.body.token);
            cy.setCookie('userID', response.body.userId);
            cy.setCookie('expires', response.body.expires);
            cy.setCookie('userName', response.body.username);

            expect(response.status).to.eq(200);
        });
});

Cypress.Commands.add('login', (username, password) => {
    cy.visit('');

    cy.contains('Book Store')
        .click();

    cy.contains('Book Store App')
        .click();

    cy.contains('Login')
        .click({ force: true });

    cy.get('#userName')
        .clear()
        .type(username);

    cy.get('#password')
        .clear()
        .type(password);

    cy.get('#login')
        .click();
});