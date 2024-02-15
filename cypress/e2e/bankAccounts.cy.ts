import { BANK_ACCOUNT } from "../pageObjects/bankAccount"
import { HOME } from "../pageObjects/home"
import { ChanceService } from "../utils/chance"


describe("Bank Accounts Tests", () => {
    beforeEach(() => {
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

        cy.get(HOME.BTN_BANK_ACCOUNTS)
        .should("be.visible")
        .click()
    })

    it("Delete bank account", () => {
        cy.get(BANK_ACCOUNT.BTN_DELETE_BANK_ACCOUNT)
        .should("be.visible")

        cy.get(BANK_ACCOUNT.BTN_DELETE_BANK_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(BANK_ACCOUNT.BANK_ACCOUNT_GRID)
        .should("be.visible")
        .and("contain.text", "(Deleted)")
    })

    it("Create bank account", () => {
        cy.get(BANK_ACCOUNT.BTN_CREATE_BANK_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(BANK_ACCOUNT.INPUT_BANK_NAME)
        .should("be.visible")
        .type("Bradesco")

        cy.get(BANK_ACCOUNT.INPUT_ROUTING_NUMBER)
        .should("be.visible")
        .type("111111111")

        cy.get(BANK_ACCOUNT.INPUT_ACCOUNT_NUMBER)
        .should("be.visible")
        .type("111111111")

        cy.get(BANK_ACCOUNT.BTN_SAVE)
        .should("be.visible")
        .click()

        cy.get(BANK_ACCOUNT.BTN_DELETE_BANK_ACCOUNT)
        .should("be.visible")
        .then($buttons => {
            expect($buttons.length).equal(2)
        })
    })

    it("Insert empty values in inputs", () => {
        cy.get(BANK_ACCOUNT.BTN_CREATE_BANK_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(BANK_ACCOUNT.INPUT_BANK_NAME)
        .should("be.visible")
        .type("Bradesco")
        .clear()

        cy.get(BANK_ACCOUNT.INPUT_ROUTING_NUMBER)
        .should("be.visible")
        .type("111111111")
        .clear()

        cy.get(BANK_ACCOUNT.MSG_ERROR_BANK_NAME)
        .should("be.visible")
        .and("have.text", "Enter a bank name")

        cy.get(BANK_ACCOUNT.INPUT_ACCOUNT_NUMBER)
        .should("be.visible")
        .type("111111111")
        .clear()

        cy.get(BANK_ACCOUNT.MSG_ERROR_ROUTING_NUMBER)
        .should("be.visible")
        .and("have.text", "Enter a valid bank routing number")

        cy.get(BANK_ACCOUNT.INPUT_BANK_NAME)
        .should("be.visible")
        .type("Bradesco")
        .clear()

        cy.get(BANK_ACCOUNT.MSG_ERROR_ACCOUNT_NUMBER)
        .should("be.visible")
        .and("have.text", "Enter a valid bank account number")
    })

    it("Insert invalid values in inputs", () => {
        cy.get(BANK_ACCOUNT.BTN_CREATE_BANK_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(BANK_ACCOUNT.INPUT_BANK_NAME)
        .should("be.visible")
        .type("A")

        cy.get(BANK_ACCOUNT.MSG_ERROR_BANK_NAME)
        .should("be.visible")
        .and("have.text", "Must contain at least 5 characters")

        cy.get(BANK_ACCOUNT.INPUT_ROUTING_NUMBER)
        .should("be.visible")
        .type("1")

        cy.get(BANK_ACCOUNT.MSG_ERROR_ROUTING_NUMBER)
        .should("be.visible")
        .and("have.text", "Must contain a valid routing number")

        cy.get(BANK_ACCOUNT.INPUT_ACCOUNT_NUMBER)
        .should("be.visible")
        .type("1")

        cy.get(BANK_ACCOUNT.MSG_ERROR_ACCOUNT_NUMBER)
        .should("be.visible")
        .and("have.text", "Must contain at least 9 digits")
    })
})