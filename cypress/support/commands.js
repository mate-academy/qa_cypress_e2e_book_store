Cypress.Commands.add('login', () => {
  const userName = 'Mandalorian'
  const password = '123QWEasdzxc!'
  cy.request('POST', 'https://demoqa.com/Account/v1/Login', {
    userName: userName,
    password: password,
  }).then((response) => {
    cy.setCookie('token', response.body.token)
    cy.setCookie('userID', response.body.userId)
    cy.setCookie('expires', response.body.expires)
  })
})
