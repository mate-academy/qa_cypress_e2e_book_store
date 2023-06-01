/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        checkIsUserLoggedIn(userName: string): Chainable<any>
        loginRequest(userName: string, password: string): Chainable<any>
    }
}
