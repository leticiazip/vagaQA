Feature: Enviar formulário

  Background: Acessar "Form.HTML"
    Given que estou na página do formulário
    When submeto todos os campos com informações válidas

  Scenario: Enviar formulário com informações válidas
    Then o sistema deve informar uma mensagem de sucesso

  Scenario Outline: Enviar formulário com campo "<campo>" inválido
    And o campo "<campo>" está preenchido de forma inválida
    Then o sistema deve informar a mensagem de erro "<msgErro>"

    Examples:
      | campo    | msgErro                 |
      | Name     | Campo Name inválido.    |
      | Email    | Campo Email inválido.   |
      | Company  | Campo Company inválido. |
      | Website  | Campo Website inválido. |
      | Phone    | Campo Phone inválido.   |
      | Inquiry  | Campo Inquiry inválido. |