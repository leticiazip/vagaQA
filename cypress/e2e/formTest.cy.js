/// <reference types="cypress"/>
import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";
import {faker} from '@faker-js/faker';

let Nome = faker.name.firstName()
let Email = faker.internet.email(Nome)
let Company = faker.company.name()
let Website = faker.internet.url()
let Phone = '(51) 99358-2171'
let Inquiry = faker.lorem.lines(2)
let campoInvalido = false
let formato = null

Given("que estou na página do formulário", () => {
    cy.visit("/form.html")
})

When("submeto todos os campos com informações válidas", () => {
    cy.preencherTodosCampos(Nome, Email, Company, Website, Phone, Inquiry)
})

And('o campo {string} está preenchido de forma inválida', (campo) => {
    switch (campo) {
        case 'Name':
            let nomeTeste = "LETICIA SOARES CASTILHO"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            cy.preencherNome(nomeTeste)

            //Validação das regras descritas no documento para o campo "Name"
            if (nomeTeste.length > 255 || formato.test(nomeTeste)) {
                cy.log('"Name" possui caracteres inválidos ou mais que 255 caracteres')
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break

        case 'Email':
            let emailTeste = "leticiaskcastilho@gmail.com"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+[.][A-Za-z.]{2,}$/
            cy.preencherEmail(emailTeste)

            //Validação das regras descritas no documento para o campo "Email"
            if (emailTeste.length > 150 || (formato.test(emailTeste) == false)) {
                cy.log('"Email" não possui o padrão @domínio ou possui mais que 150 caracteres')
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break

        case 'Company':
            let companyTeste = "PagBrasil"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            cy.preencherEmpresa(companyTeste)

            //Validação das regras descritas no documento para o campo "Company"
            if (companyTeste.length > 200 || formato.test(companyTeste)) {
                cy.log('"Company" possui caracteres inválidos ou mais que 200 caracteres')
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break

        case 'Website':
            let websiteTeste = "http://teste.com"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /^(http:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
            cy.preencherSite(websiteTeste)

            //Validação das regras descritas no documento para o campo "Website"
            if (websiteTeste.length > 200 || formato.test(websiteTeste) == false) {
                cy.log('"Website" não está no formato URL ou possui mais que 200 caracteres')
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break
        case 'Phone':
            let phone1 = "(51) 99358-2171"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /^([(][1-9]{2}[)] )?[0-9]{5}[-]?[0-9]{4}$/;
            cy.preencherCelular(phone1)

            //Validação das regras descritas no documento para o campo "Phone"
            if (phone1.length > 15 || formato.test(phone1) == false) {
                cy.log('"Phone" não está no padrão brasileiro de telefone ou possui mais que 15 caracteres')
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break

        case 'Inquiry':
            let inquiryTest = "Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus"
            //Utilizando regex para seguir com a formatação requisitada
            formato = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
            cy.preencherInformacoes(inquiryTest)

            //Validação das regras descritas no documento para o campo "Inquiry"
            if (inquiryTest.length > 500 || formato.test(inquiryTest)) {
                cy.log("Inquiry possui mais que 500 caracteres ou possui caracteres especiais")
                campoInvalido = true
            } else
                cy.log("Fora do escopo do teste.")
            Then('o sistema deve informar a mensagem de erro {string}', (msgErro) => {
                if (campoInvalido = true) {
                    //Utilização do "cy.intercept()" para mockar o response da suposta requisição de envio do formulário
                    cy.intercept('POST', '**/sendForms', {
                        statusCode: 412,
                        body: {
                            "sucesso": false,
                            "erro": msgErro
                        }
                    }).as('enviadoComErro')

                    cy.get("button").click()
                    cy.wait('@enviadoComErro').its('response.body.sucesso').should('be.false')
                    cy.get('#Error').should('contain.text', msgErro)
                } else
                    cy.log("Fora do escopo do teste.")
            })
            break
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
    cy.get('#successMessage').should('contain.text', "Form submitted successfully!")
    cy.wait('@envioComSucesso').its('response.body.sucesso').should('be.true')
})