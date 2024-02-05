/// <reference types="cypress" />
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
import { CreateAccountModel } from "../models/account"
import { ACCOUNT } from "../pageObjects/account"
import { LOGIN } from "../pageObjects/login"
import { HOME } from "../pageObjects/home"

Cypress.Commands.add('createAccount', (user: CreateAccountModel) => {
    cy.visit("/signin")

    cy.get(LOGIN.LINK_CREATE_ACCOUNT)
    .should("be.visible")
    .click();

    cy.get(ACCOUNT.INPUT_FIRSNAME)
    .should("be.visible")
    .type(user.name)

    cy.get(ACCOUNT.INPUT_LASTNAME)
    .should("be.visible")
    .type(user.lastname)

    cy.get(ACCOUNT.INPUT_USERNAME)
    .should("be.visible")
    .type(user.username)

    cy.get(ACCOUNT.INPUT_PASSWORD)
    .should("be.visible")
    .type(user.password)

    cy.get(ACCOUNT.INPUT_CONFIRM_PASSWORD)
    .should("be.visible")
    .type(user.password)

    cy.get(ACCOUNT.BTN_SIGNUP)
    .should("be.visible")
    .click();

    cy.get(LOGIN.LINK_CREATE_ACCOUNT)
    .should("be.visible");
})

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/signin');

    cy.get(LOGIN.INPUT_USERNAME)
    .should("be.visible")
    .type(username)

    cy.get(LOGIN.INPUT_PASSWORD)
    .should("be.visible")
    .type(password)

    cy.get(LOGIN.BTN_SIGN_IN)
    .should("be.visible")
    .click()

    cy.get(HOME.BTN_HOME)
    .should("be.visible")
})

declare global {
    namespace Cypress {
        interface Chainable {
            createAccount(user: CreateAccountModel): Chainable<void>
            login(username: string, password: string): Chainable<void>
        }
    }
}