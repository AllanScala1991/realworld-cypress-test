import { HOME } from "../pageObjects/home"
import { MY_ACCOUNT } from "../pageObjects/myAccount"
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

        cy.createBankAccount("Bradesco", "123456789", "123456789")

        cy.get(HOME.BTN_MY_ACCOUNT)
        .should("be.visible")
        .click()
    })

    it("Add email and phone number in my account", () => {
        cy.get(MY_ACCOUNT.INPUT_EMAIL)
        .should("be.visible")
        .type("test@mail.com")

        cy.get(MY_ACCOUNT.INPUT_PHONE)
        .should("be.visible")
        .type("41999999999")

        cy.get(MY_ACCOUNT.BTN_SAVE)
        .should("be.visible")
        .click()

        cy.get(HOME.BTN_HOME)
        .should("be.visible")
        .click()

        cy.get(HOME.BTN_MY_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(MY_ACCOUNT.INPUT_EMAIL)
        .should("be.visible")
        .and("have.value","test@mail.com")

        cy.get(MY_ACCOUNT.INPUT_PHONE)
        .should("be.visible")
        .and("have.value","41999999999")
    })

    it("Update user first name and last name", () => {
        cy.insertEmailAndPhoneInMyAccount()

        cy.get(MY_ACCOUNT.INPUT_FIRSTNAME)
        .should("be.visible")
        .clear()
        .type("update first name")

        cy.get(MY_ACCOUNT.INPUT_LASTNAME)
        .should("be.visible")
        .clear()
        .type("update last name")

        cy.get(MY_ACCOUNT.BTN_SAVE)
        .should("be.visible")
        .click()

        cy.get(HOME.BTN_HOME)
        .should("be.visible")
        .click()

        cy.get(HOME.BTN_MY_ACCOUNT)
        .should("be.visible")
        .click()

        cy.get(MY_ACCOUNT.INPUT_FIRSTNAME)
        .should("be.visible")
        .and("have.value","update first name")

        cy.get(MY_ACCOUNT.INPUT_LASTNAME)
        .should("be.visible")
        .and("have.value","update last name")
    })

    it("Validate error messages with empty inputs", () => {
        cy.insertEmailAndPhoneInMyAccount()

        cy.get(MY_ACCOUNT.INPUT_FIRSTNAME)
        .should("be.visible")
        .clear()
        
        cy.get(MY_ACCOUNT.FIRST_NAME_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Enter a first name")

        cy.get(MY_ACCOUNT.INPUT_LASTNAME)
        .should("be.visible")
        .clear()

        cy.get(MY_ACCOUNT.LAST_NAME_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Enter a last name")

        cy.get(MY_ACCOUNT.INPUT_EMAIL)
        .should("be.visible")
        .clear()

        cy.get(MY_ACCOUNT.EMAIL_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Enter an email address")

        cy.get(MY_ACCOUNT.INPUT_PHONE)
        .should("be.visible")
        .clear()

        cy.get(MY_ACCOUNT.PHONE_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Enter a phone number")
    })

    it("Insert invalid value in email and phone", () => {
        cy.get(MY_ACCOUNT.INPUT_EMAIL)
        .should("be.visible")
        .type("invalid")

        cy.get(MY_ACCOUNT.INPUT_PHONE)
        .should("be.visible")
        .type("41")

        cy.get(MY_ACCOUNT.EMAIL_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Must contain a valid email address")

        cy.get(MY_ACCOUNT.PHONE_MSG_ERROR)
        .should("be.visible")
        .and("have.text", "Phone number is not valid")
    })

})