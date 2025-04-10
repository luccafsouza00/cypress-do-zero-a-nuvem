describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  Cypress._.times(5, () => {
    it("preenche os campos obrigatórios e envia o formulário", () => {
      const longText = Cypress._.repeat("abcdefghijklmnopqrstuvwxyz", 10);

      cy.get("#firstName").type("lucca");
      cy.get("#lastName").type("souza");
      cy.get("#email").type("luccasouza@mailinator.com");
      cy.get("#open-text-area").type(longText, { delay: 0 });

      cy.clock();

      cy.contains("button", "Enviar").click();
      cy.get(".success").should("be.visible");

      cy.tick(3000);

      cy.get(".success").should("not.be.visible");
    });
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("lucca");
    cy.get("#lastName").type("souza");
    cy.get("#email").type("luccasouzamailinator.com");
    cy.get("#open-text-area").type("teste");

    cy.clock();

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("campo telefone deve continuar vazio ao digitar valores não numéricos", () => {
    cy.get("#phone").type("test");
    cy.get("#phone").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("lucca");
    cy.get("#lastName").type("souza");
    cy.get("#email").type("luccasouza@mailinator.com");
    cy.get("#open-text-area").type("teste");
    cy.get("#phone-checkbox").check();

    cy.clock();

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName").type("lucca").should("have.value", "lucca");
    cy.get("#lastName").type("souza").should("have.value", "souza");
    cy.get("#email")
      .type("luccasouza@mailinator.com")
      .should("have.value", "luccasouza@mailinator.com");
    cy.get("#open-text-area").type("teste").should("have.value", "teste");

    cy.get("#firstName").clear().should("have.value", "");
    cy.get("#lastName").clear().should("have.value", "");
    cy.get("#email").clear().should("have.value", "");
    cy.get("#open-text-area").clear().should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".error").should("not.be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      name: "lucca",
      surname: "souza",
      email: "luccasouza@mailinator.com",
      text: "text",
    };

    cy.clock();

    //cy.fillMandatoryFieldsAndSubmit(data);
    cy.fillMandatoryFieldsAndSubmit();
    //cy.contains(".success", "Mensagem enviada com sucesso.");
    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it("seleciona um produto aleatório por seu índice sem considerar a opção desabilitada", () => {
    // cy.get("#product option")
    //   .not("[disabled]") //
    //   .its("length") //
    //   .then((n) => {
    //     cy.get("#product").select(Cypress._.random(1, n));
    //   });

    cy.pickRandomProduct();
  });

  it("marca o tipo de atendimento 'Feedback'", () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("be.checked");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((el) => {
      cy.wrap(el).check().should("be.checked");
    });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("./cypress/fixtures/example.json")
      .then((input) => {
        console.log(input);
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("./cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("file");

    cy.get("#file-upload")
      .selectFile("@file")
      .then((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .as("link")
      .invoke("removeAttr", "target");
    cy.get("@link").click();

    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });

  it("exibe e oculta as mensagens de sucesso e erro", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "teste")
      .should("have.value", "teste");
  });

  it("faz uma requisição HTTP", () => {
    cy.request(
      "https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html"
    ).should((res) => {
      console.log(res);
      expect(res.status).to.be.eql(200);
      expect(res.statusText).to.be.eql("OK");
      expect(res.body).to.include("CAC TAT");
    });

    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);
    cy.get("@getRequest").its("statusText").should("be.equal", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });

  it("mostra o gato escondido", () => {
    cy.get("#cat").invoke("show").should("be.visible");
    cy.get("h1").invoke("text", "CAT TAT").should("be.visible");
  });
});

