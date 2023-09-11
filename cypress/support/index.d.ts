/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    findByPlaceholder(placeholder: string): Chainable<any>
    login(username: string, password: string): Chainable<any>
  }
}
