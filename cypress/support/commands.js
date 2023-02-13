Cypress.Commands.add('findByPlaceholder', (placeholder) => { 
    cy.get(`[placeholder="${placeholder}"]`);
});

Cypress.Commands.add('login', (userName, password) => { 
cy.request({
    url: '/Account/v1/Login', 
    method: 'POST',
    body: {
        userName,
        password
    },
}).then(response => {
    cy.setCookie('token', response.body.token);
    cy.setCookie('expires', response.body.expires);
    cy.setCookie('userName', response.body.username);
    cy.setCookie('userID', response.body.userId);
});

    cy.visit('/profile');
});

Cypress.Commands.add('additionAlert', () => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book added to your collection.`)
    });
});

Cypress.Commands.add('deletionAlert', () => {
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`Book deleted.`)
    });
});