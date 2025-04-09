// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data = {
      name: "nome",
      surname: "surname",
      email: "email@email.com",
      text: "text",
    }
  ) => {
    cy.get("#firstName").type(data.name);
    cy.get("#lastName").type(data.surname);
    cy.get("#email").type(data.email);
    cy.get("#open-text-area").type(data.text);
    cy.contains("button", "Enviar").click();
  }
);

Cypress.Commands.add("pickRandomProduct", () => {
  cy.get("#product option").then((options) => {
    const indexesOfEnabledProducts = [];

    for (let i = 0; i < options.length; i++) {
      if (!options[i].disabled) {
        indexesOfEnabledProducts.push(i);
      }
    }

    const randomEnabledProducts =
      indexesOfEnabledProducts[
        Cypress._.random(0, indexesOfEnabledProducts.length - 1)
      ];

    cy.log(`lista dos indexes de produtos habilitados: ${indexesOfEnabledProducts}`)

    cy.get('#product').select(randomEnabledProducts);
  });
});
