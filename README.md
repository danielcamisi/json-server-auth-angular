# JwtManagerProject

## Introdução

Este projeto é gerado e beaseado em [Angular CLI](https://github.com/angular/angular-cli) na versão 17.0.0 em conjunto com as linguagens TypeScript, JavaScript e JSON. O objetivo principal é implementar autenticação de usuários por meio de JWT (JSON Web Token). Além disso, o sistema permite a criação e gerenciamento de projetos, utilizando um back-end simulado com json-server-auth, possibilitando a criação de projetos com descrições e status.

## Funcionalidade

Autenticação JWT: Implementação de login seguro para usuários utilizando JSON Web Tokens.
Gerenciamento de Projetos: Criação, visualização e atualização de projetos com descrições e status.
Integração com PrimeNG: Utilização de componentes como o Pick List para facilitar tarefas, como a alteração de status entre objetos JSON.
Integração com MySQL: Utilização do MySQL para gerenciar dados de projetos, incluindo nomes, descrições e status, mantendo separado dos dados de login e autenticação para melhor aproveitamento das tecnologias.
Implementação de Testes Unitários: Uso do Karma e Jasmine para garantir qualidade e confiabilidade durante o desenvolvimento do sistema.

## Tecnologias

[NodeJS](https://nodejs.org/pt)
[Angular](https://angular.dev)
[PrimeNG](https://primeng.org)
[JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[TypeScript](https://www.typescriptlang.org)
[JSON](https://www.json.org/json-en.html)
[MySQL](https://www.mysql.com)

## Como rodar o projeto na minha máquina?

`git clone https://github.com/danielcamisi/json-server-auth-angular/`

`npm install` (Para instalar todas as dependências do código)
`npm install primeng primeicons`(O primeNG possui algumas pendências que devem ser instaladas separadamente)

Para iniciar o banco de dados em JSON:

`npm run dev` (Para executar o banco de dados em json)

`OBS:`Entre dentro da pasta json-server para iniciar qualquer um das duas conexões ao Banco de dados.

`node server.js` ou `nodemon server.js`(Para executar o banco de dados em MySQL)

Execute `ng serve` para um servidor de desenvolvedor. Entre em  `http://localhost:4200/`. e a aplicação irá roda automáticamente.

## Code scaffolding

Execute `ng generate component nome-do-componente` para gerar um novo componente. Você também pode usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Compilando

Execute `ng build` para compilar o projeto. Os artefatos de compilação serão armazenados no diretório `dist/.`

## Executando testes unitários

Rode  `ng test` para executar os testes unitários via [Karma](https://karma-runner.github.io).

## Ajuda

Para visualizar mais informações de como utilizar o Angular, digite  `ng help` no terminal, ou confira a página do [Angular CLI Overview and Command Reference](https://angular.io/cli).
