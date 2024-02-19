import { HOME } from "../pageObjects/home"
import { TRANSACTION } from "../pageObjects/transaction"
import { ChanceService } from "../utils/chance"


describe("Transaction Tests", () => {
    beforeEach(() => {
        cy.accessHome()

        cy.get(HOME.BTN_NEW_TRANSACTIONS)
        .should("be.visible")
        .click()
    })

    it("Create new pay transaction", () => {
        cy.get(TRANSACTION.USERS_IN_LIST)
        .eq(1)
        .should("be.visible")
        .click({ force: true })

        cy.get(TRANSACTION.INPUT_AMOUNT)
        .should("be.visible")
        .type("1000")

        cy.get(TRANSACTION.INPUT_NOTE)
        .should("be.visible")
        .type("Test")

        cy.get(TRANSACTION.BTN_PAY)
        .should("be.visible")
        .click({ force: true })

        cy.get("h2")
        .should("be.visible")
        .and("contain.text", "Paid")
    })

    it("Create new request transaction", () => {
        cy.get(TRANSACTION.USERS_IN_LIST)
        .eq(1)
        .should("be.visible")
        .click({ force: true })
        
        cy.get(TRANSACTION.INPUT_AMOUNT)
        .should("be.visible")
        .type("1000")

        cy.get(TRANSACTION.INPUT_NOTE)
        .should("be.visible")
        .type("Test")

        cy.get(TRANSACTION.BTN_REQUEST)
        .should("be.visible")
        .click({ force: true })

        cy.get("h2")
        .should("be.visible")
        .and("contain.text", "Requested")
    })

    it("Find transaction", () => {
        cy.get(TRANSACTION.INPUT_SEARCH)
        .should("be.visible")
        .type("Edgar Johns", { force: true })

        cy.get(TRANSACTION.USERS_IN_LIST)
        .should("be.visible")
        .eq(0)
        .and("contains.text", "Edgar Johns")
    })

    it("Open transaction and insert new comment", () => {
        cy.get(HOME.BTN_HOME)
        .should("be.visible")
        .click()

        cy.get("li")
        .eq(0)
        .click({ force: true })

        cy.get("input")
        .should("be.visible")
        .type("Test")
        .type('{enter}')

        cy.get("h2")
        .should("be.visible")
        .and("contains.text", "Comments")
    })

    it("Insert empty value in inputs", () => {
        cy.get(TRANSACTION.USERS_IN_LIST)
        .eq(1)
        .should("be.visible")
        .click({ force: true })

        cy.get(TRANSACTION.INPUT_AMOUNT)
        .should("be.visible")
        .type("1000")
        .clear()

        cy.get(TRANSACTION.INPUT_NOTE)
        .should("be.visible")
        .type("Test")
        .clear()

        cy.get(TRANSACTION.INPUT_AMOUNT)
        .focus()

        cy.get(TRANSACTION.MSG_ERROR_AMOUNT)
        .should("be.visible")
        .and("contain.text", "Please enter a valid amount")

        cy.get(TRANSACTION.MSG_ERROR_NOTE)
        .should("be.visible")
        .and("contain.text", "Please enter a note")
    })
})