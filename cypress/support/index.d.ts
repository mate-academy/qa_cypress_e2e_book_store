/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    assertPageUrl(url: string): Chainable<any>
  }
}
