import { HOME } from "../pageObjects/home"
import { ChanceService } from "../utils/chance"


describe("Create Bank Account Tests", () => {

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
    })

    it("Create new bank account", () => {
        cy.get(HOME.INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .type("Bradesco")

        cy.get(HOME.INPUT_ROUTING_NUMBER_MODAL)
        .should("be.visible")
        .type("999999999")

        cy.get(HOME.INPUT_ACCOUNT_NUMBER_MODAL)
        .should("be.visible")
        .type("888888888")

        cy.get(HOME.BTN_SAVE_MODAL)
        .should("be.visible")
        .click()

        cy.get(HOME.MODAL_FINISH_ACCOUNT_BANK_CREATED_MSG)
        .should("be.visible")
        .and("have.text", "Finished")
    })

    it("Send empty values and validate error messages", () => {
        cy.get(HOME.INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .focus()

        cy.get(HOME.INPUT_ROUTING_NUMBER_MODAL)
        .should("be.visible")
        .focus()

        cy.get(HOME.ERROR_MSG_INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .and("have.text", "Enter a bank name")

        cy.get(HOME.INPUT_ACCOUNT_NUMBER_MODAL)
        .should("be.visible")
        .focus()

        cy.get(HOME.ERROR_MSG_INPUT_ROUTING_NUMBER_MODAL)
        .should("be.visible")
        .and("have.text", "Enter a valid bank routing number")

        cy.get(HOME.INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .focus()

        cy.get(HOME.ERROR_MSG_INPUT_ACCOUNT_NUMBER_MODAL)
        .should("be.visible")
        .and("have.text", "Enter a valid bank account number")

        cy.get(HOME.BTN_SAVE_MODAL)
        .should("be.visible")
        .and("be.disabled")
    })

    it("Send invalid values and validate error messages", () => {
        cy.get(HOME.INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .type("1111")

        cy.get(HOME.ERROR_MSG_INPUT_BANK_NAME_MODAL)
        .should("be.visible")
        .and("have.text", "Must contain at least 5 characters")

        cy.get(HOME.INPUT_ROUTING_NUMBER_MODAL)
        .should("be.visible")
        .type("99999999")

        cy.get(HOME.ERROR_MSG_INPUT_ROUTING_NUMBER_MODAL)
        .should("be.visible")
        .and("have.text", "Must contain a valid routing number")

        cy.get(HOME.INPUT_ACCOUNT_NUMBER_MODAL)
        .should("be.visible")
        .type("88888888")

        cy.get(HOME.ERROR_MSG_INPUT_ACCOUNT_NUMBER_MODAL)
        .should("be.visible")
        .and("have.text", "Must contain at least 9 digits")

        cy.get(HOME.BTN_SAVE_MODAL)
        .should("be.visible")
        .and("be.disabled")
    })
})