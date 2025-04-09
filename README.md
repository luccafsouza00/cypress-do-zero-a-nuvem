# 💻 Projeto: Testes End-to-End com Cypress

Este projeto foi desenvolvido durante o curso **Cypress do Zero à Nuvem**, ministrado por **Walmyr Filho**, com o objetivo de aprender os comandos básicos do framework Cypress.



## ✅ Pré-requisitos

Antes de começar, você precisará ter os seguintes itens instalados na sua máquina:

- [Node.js](https://nodejs.org/) - `v20.15.0`
- [npm](https://www.npmjs.com/) - `v10.7.0`

> Essas foram as versões utilizadas no projeto. É recomendado utilizar as mesmas ou versões LTS mais recentes.


## 📦 Instalação

Para instalar as dependências do projeto, execute o comando:

```bash
npm install
```


## 🚀 Como executar os testes

Neste projeto, é possível rodar os testes tanto no modo headless (sem interface) quanto no modo interativo (com interface gráfica).

### Modo Headless

Executa os testes diretamente no terminal com viewport de desktop:

```bash
npm run cy:run
```

Para rodar os testes simulando um dispositivo mobile:

```bash
npm run cy:run:mobile
```

### Modo Interativo (Cypress App)

Abre a interface gráfica do Cypress para execução dos testes:

```bash
npm run cy:open
```

Para abrir o Cypress simulando um dispositivo mobile:

```bash
npm run cy:open:mobile
```
