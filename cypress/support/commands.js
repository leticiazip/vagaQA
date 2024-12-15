Cypress.Commands.add('preencherNome', (name) => {
    return cy.get("#name").clear().type(name);
})

Cypress.Commands.add('preencherEmail', (email) => {
    return cy.get("#email").clear().type(email);
})

Cypress.Commands.add('preencherEmpresa', (company) => {
    return cy.get("#company").clear().type(company);
})

Cypress.Commands.add('preencherSite', (website) => {
    return cy.get("#website").clear().type(website);
})

Cypress.Commands.add('preencherCelular', (phone) => {
    return cy.get("#phone").clear().type(phone);
})

Cypress.Commands.add('preencherInformacoes', (inquiry) => {
    return cy.get("#inquiry").clear().type(inquiry);
})

Cypress.Commands.add('preencherTodosCampos', (name, email, company, website, phone, inquiry) => {
    cy.preencherNome(name)
    cy.preencherEmail(email)
    cy.preencherEmpresa(company)
    cy.preencherSite(website)
    cy.preencherCelular(phone)
    cy.preencherInformacoes(inquiry)
})