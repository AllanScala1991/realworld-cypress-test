/// <reference types="cypress" />

import { CreateAccountModel } from "../models/account"
import { ACCOUNT } from "../pageObjects/account"
import { LOGIN } from "../pageObjects/login"
import { HOME } from "../pageObjects/home"
import { MY_ACCOUNT } from "../pageObjects/myAccount"
import { ChanceService } from "../utils/chance"

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

Cypress.Commands.add('createBankAccount', (bankName: string, routingNumber: string, accountNumber: string) => {
    cy.get(HOME.INPUT_BANK_NAME_MODAL)
    .should("be.visible")
    .type(bankName)

    cy.get(HOME.INPUT_ROUTING_NUMBER_MODAL)
    .should("be.visible")
    .type(routingNumber)

    cy.get(HOME.INPUT_ACCOUNT_NUMBER_MODAL)
    .should("be.visible")
    .type(accountNumber)

    cy.get(HOME.BTN_SAVE_MODAL)
    .should("be.visible")
    .click()

    cy.get(HOME.BTN_DONE_MODAL)
    .should("be.visible")
    .click()
})

Cypress.Commands.add('insertEmailAndPhoneInMyAccount', () => {
    cy.get(MY_ACCOUNT.INPUT_EMAIL)
    .should("be.visible")
    .type("test@mail.com")

    cy.get(MY_ACCOUNT.INPUT_PHONE)
    .should("be.visible")
    .type("41999999999")

    cy.get(MY_ACCOUNT.BTN_SAVE)
    .should("be.visible")
    .click()
})

Cypress.Commands.add('accessHome', () => {
    const user = {
        name: new ChanceService().generateFullName().name,
        lastname: new ChanceService().generateFullName().lastname,
        username: new ChanceService().generateFullName().name,
        password: new ChanceService().generateSentence()
    }

    cy.createAccount(user)

    cy.login(user.username, user.password)

    cy.get(HOME.BTN_NEXT_MODAL_GET_STARTED)
    .should("be.visible")
    .click()

    cy.createBankAccount("Bradesco", "123456789", "123456789")
})

declare global {
    namespace Cypress {
        interface Chainable {
            createAccount(user: CreateAccountModel): Chainable<void>
            login(username: string, password: string): Chainable<void>
            createBankAccount(bankName: string, routingNumber: string, accountNumber: string): Chainable<void>
            insertEmailAndPhoneInMyAccount(): Chainable<void>
            accessHome(): Chainable<void>
        }
    }
}