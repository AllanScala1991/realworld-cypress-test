import { LOGIN } from "../pageObjects/login";
import { HOME } from "../pageObjects/home";


describe("Login", () => {
    it("Login successfully", () => {
        let user = {
            name: "test",
            lastname: "cypress",
            username: "testCypress",
            password: "123456"
        }
        cy.createAccount(user);

        cy.get(LOGIN.INPUT_USERNAME)
        .should("be.visible")
        .type(user.username)

        cy.get(LOGIN.INPUT_PASSWORD)
        .should("be.visible")
        .type(user.password)

        cy.get(LOGIN.BTN_SIGN_IN)
        .should("be.visible")
        .click()

        cy.get(HOME.BTN_HOME)
        .should("be.visible")
    })
    
    it("Send invalid username", () => {
        let user = {
            name: "test",
            lastname: "cypress",
            username: "testCypress",
            password: "123456"
        }
        cy.createAccount(user);

        cy.get(LOGIN.INPUT_USERNAME)
        .should("be.visible")
        .type("invalid")

        cy.get(LOGIN.INPUT_PASSWORD)
        .should("be.visible")
        .type(user.password)

        cy.get(LOGIN.BTN_SIGN_IN)
        .should("be.visible")
        .click()

        cy.get(LOGIN.ALERT_ERROR_MSG)
        .should("be.visible")
        .and("have.text", "Username or password is invalid")
    })
})