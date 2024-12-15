Feature: Enviar formulário

  Background: Acessar "Form.HTML"
    Given que estou na página do formulário
    When submeto todos os campos com informações válidas

  Scenario: Enviar formulário com informações válidas
    Then o sistema deve informar uma mensagem de sucesso

  Scenario: Enviar formulário com campo "Nome" inválido
    And o campo "Name" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Name inválido."

  Scenario: Enviar formulário com campo "Email" inválido
    And o campo "Email" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Email inválido."

  Scenario: Enviar formulário com campo "Company" inválido
    And o campo "Company" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Company inválido."

  Scenario: Enviar formulário com campo "Website" inválido
    And o campo "Website" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Website inválido."

  Scenario: Enviar formulário com campo "Phone" inválido
    And o campo "Phone" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Phone inválido."

  Scenario: Enviar formulário com campo "Inquiry" inválido
    And o campo "Inquiry" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "Campo Inquiry inválido."
