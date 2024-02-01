import { LOGIN } from "../pageObjects/login"
import { ACCOUNT } from "../pageObjects/account"
import { ChanceService } from "../utils/chance"

describe("Account tests", () => {
    let chance = new ChanceService();
    beforeEach(() => {
        cy.visit("/signin");
    })

    it("Create new user account", () => {
        let password = chance.generateSentence();

        cy.get(LOGIN.LINK_CREATE_ACCOUNT)
        .should("be.visible")
        .click();

        cy.get(ACCOUNT.INPUT_FIRSNAME)
        .should("be.visible")
        .type(chance.generateFullName().name)

        cy.get(ACCOUNT.INPUT_LASTNAME)
        .should("be.visible")
        .type(chance.generateFullName().lastname)

        cy.get(ACCOUNT.INPUT_USERNAME)
        .should("be.visible")
        .type(chance.generateFullName().name)

        cy.get(ACCOUNT.INPUT_PASSWORD)
        .should("be.visible")
        .type(password)

        cy.get(ACCOUNT.INPUT_CONFIRM_PASSWORD)
        .should("be.visible")
        .type(password)

        cy.get(ACCOUNT.BTN_SIGNUP)
        .should("be.visible")
        .click();

        cy.get(LOGIN.LINK_CREATE_ACCOUNT)
        .should("be.visible");
    })
})