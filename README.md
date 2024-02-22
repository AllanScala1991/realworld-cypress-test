# Testes Automatizados Real World APP

## Descrição
O teste tem como objetivo, fortalecer os conhecimentos em Cypress e Github Actions

## Dependências
- Node JS 18

## Rodando os testes via Guthub Actions
- Dentro do projeto, acesse a aba "Actions"
- Clique no workflow "End to End Tests"
- Clique em "Run Workflow"
<br><br>
A action irá clonar e rodar o projeto Real World App do próprio repositório de testes, posteriormente
os testes automatizados.

## Rodandos os testes localmente
- Clone o projeto Real World App
```bash
git clone https://github.com/cypress-io/cypress-realworld-app
```
- Acesse o projeto e instale as dependências
```bash
cd cypress-realworld-app && npm install
```
- Rode o projeto localmente
```bash
npm run dev
```
<br><br>

- Clone o projeto de testes
```bash
git clone https://github.com/AllanScala1991/realworld-cypress-test
```
- Acesse o projeto e instale as dependências
```bash
cd realworld-cypress-test && npm install
```
- Rode os testes localmente
```bash
npm run cy:open
```
ou
```bash
npm run cy:run
```