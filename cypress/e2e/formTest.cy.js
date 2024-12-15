/// <reference types="cypress"/>
import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import { faker } from '@faker-js/faker';

let Nome = faker.name.firstName()
let Email = faker.internet.email(Nome)
let Empresa = faker.company.name()
let Website = faker.internet.url()
let Phone = '(51) 99358-2171'
let Inquiry = faker.lorem.lines(2)

Given("que estou na página do formulário", () => {
    cy.visit("/form.html")
})

When("submeto todos os campos com informações válidas", () => {
    cy.preencherTodosCampos(Nome, Email, Empresa, Website, Phone, Inquiry)
})

And('o campo "Name" está preenchido de forma inválida', () => {
    let nomeTeste = "LETICIA SOARES CASTILHO"
    let formato = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    cy.preencherNome(nomeTeste)

    if(nomeTeste.length > 255 || formato.test(nomeTeste)) {
        cy.log('"Name" possui caracteres inválidos ou mais que 255 caracteres')

            Then('o sistema deve informar a mensagem de erro "Campo Name inválido."', () => {
                cy.intercept('POST', '**/sendForms', {
                    statusCode: 412,
                    body: {
                        "sucesso": false,
                        "erro": "Campo Name inválido."
                    }
                }).as('enviadoComErro')

                cy.get("button").click()
                cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                cy.get('#Error').should('contain.text', "Campo Name inválido.")
            })
    }else
        cy.log("Fora do escopo do teste.")
})

And('o campo "Email" está preenchido de forma inválida', () => {
    let emailTeste = "leticiaskcastilho@gmail.com"
    let formato = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z.]{2,}$/

    cy.preencherEmail(emailTeste)

    if(emailTeste.length > 150 || formato.test(emailTeste) == false) {
            cy.log('"Email" não possui o padrão @domínio ou possui mais que 150 caracteres')

            Then('o sistema deve informar a mensagem de erro "Campo Email inválido."', () => {
                cy.intercept('POST', '**/sendForms', {
                    statusCode: 412,
                    body: {
                        "sucesso": false,
                        "erro": "Campo Email inválido."
                    }
                }).as('enviadoComErro')

                cy.get("button").click()
                cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                cy.get('#Error').should('contain.text', "Campo Email inválido.")
            })
        } else
            cy.log("Fora do escopo do teste.")
})

And('o campo "Company" está preenchido de forma inválida', () => {
    let companyTeste = "PagBrasil"
    let formato = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

    cy.preencherEmpresa(companyTeste)

    if(companyTeste.length > 200 || formato.test(companyTeste)) {
            cy.log('"Company" possui caracteres inválidos ou mais que 200 caracteres')

            Then('o sistema deve informar a mensagem de erro "Campo Company inválido."', () => {
                cy.intercept('POST', '**/sendForms', {
                    statusCode: 412,
                    body: {
                        "sucesso": false,
                        "erro": "Campo Company inválido."
                    }
                }).as('enviadoComErro')

                cy.get("button").click()
                cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                cy.get('#Error').should('contain.text', "Campo Company inválido.")
            })
        } else
            cy.log("Fora do escopo do teste.")
})

And('o campo "Website" está preenchido de forma inválida', () => {
    let websiteTeste = "http://teste.com"
    let formato = /^(http:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

    cy.preencherSite(websiteTeste)

    if(websiteTeste.length > 200 || formato.test(websiteTeste) == false) {
            cy.log('"Website" não está no formato URL ou possui mais que 200 caracteres')

            Then('o sistema deve informar a mensagem de erro "Campo Website inválido."', () => {
                cy.intercept('POST', '**/sendForms', {
                    statusCode: 412,
                    body: {
                        "sucesso": false,
                        "erro": "Campo Website inválido."
                    }
                }).as('enviadoComErro')

                cy.get("button").click()
                cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                cy.get('#Error').should('contain.text', "Campo Website inválido.")
            })
        } else
            cy.log("Fora do escopo do teste.")
})

And('o campo "Phone" está preenchido de forma inválida', () => {
    let phone1 = "(51) 99358-2171"
    let format = /^([(][1-9]{2}[)] )?[0-9]{5}[-]?[0-9]{4}$/;

    cy.preencherCelular(phone1)

    if(phone1.length > 15 || format.test(phone1) == false) {
            cy.log('"Phone" não está no padrão brasileiro de telefone ou possui mais que 15 caracteres')

            Then('o sistema deve informar a mensagem de erro "Campo Phone inválido."', () => {
                cy.intercept('POST', '**/sendForms', {
                    statusCode: 412,
                    body: {
                        "sucesso": false,
                        "erro": "Campo Phone inválido."
                    }
                }).as('enviadoComErro')

                cy.get("button").click()
                cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                cy.get('#Error').should('contain.text', "Campo Phone inválido.")
            })
        } else
            cy.log("Fora do escopo do teste.")
})

And('o campo "Inquiry" está preenchido de forma inválida', () => {
    let inquiryTest = "teste"

    cy.preencherInformacoes(inquiryTest)

    if(inquiryTest.length <= 500) {
        cy.log("Inquiry possui menos que 500 caracteres")
        cy.log("Fora do escopo do teste.")
    }
    else {
        Then('o sistema deve informar a mensagem de erro "Campo Inquiry inválido."', () => {
            cy.intercept('POST', '**/sendForms', {
                statusCode: 412,
                body: {
                    "sucesso": false,
                    "erro": "Campo Inquiry inválido."
                }
            }).as('enviadoComErro')

            cy.get("button").click()
            cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
            cy.get('#Error').should('contain.text', "Campo Inquiry inválido.")
        })
    }
})

Then("o sistema deve informar uma mensagem de sucesso", () => {
    cy.intercept('POST', '**/sendForms', {
        statusCode: 201,
        body: {
            "sucesso": true
        }
    }).as('envioComSucesso')
    cy.get("button").click()
    cy.get('#successMessage').should('contain.text',"Form submitted successfully!")
    cy.wait('@envioComSucesso').its('response.body.sucesso').should('be.true')
})