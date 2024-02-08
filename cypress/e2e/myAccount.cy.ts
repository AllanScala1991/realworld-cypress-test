import { HOME } from "../pageObjects/home"
import { ChanceService } from "../utils/chance"

describe("My Account Tests", () => {
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

        cy.createBankAccount("Itau", "123456789", "123456789")
    })

})