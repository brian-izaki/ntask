# Projeto do livro de [API com Node da Casa do código](https://www.casadocodigo.com.br/products/livro-apis-nodejs)

## Necessário para executar:

- Node
- utilizar ambiente Linux ou WSL com alguma distro no windows
- SQLite instalado na máquina

## Para executar:

- utilize o comando `npm start`

## Status HTTP utilizados

- sucessos
  - 204 -> no content
- resposta de erro ao cliente
  - 412 -> precondition failed

## Gerenciamento de login (com JWT, Passport e bcrypt)

- foi adicionado atributos no config.js de secret e session
- depois, criado um arquivo auth.js onde ficou as funções para inicialização e autenticação do Passport
- em seguida, foi editado o middleware.js para poder inicializar o Passport
- além disso, foi adicionado códigos relacionados a encriptação de senha do usuário com o bcrypt na model/User.js
- seguidamente, foi criado uma rota (auth.js) para gerar um token para usuário que esteja cadastrado no banco.
- Com o arquivo de token, caso o client enviei um token válido, por consequência é greado o objeto req.user. Isto apenas ocorre quando é retornado um usuário válido.
- ademais, deve ser visto nos arquivos de tasks.js e users.js que foi invocado a função authenticate do arquivo auth.js. Assim, apenas usuários com tokens válidos poderão acessar estas rotas.

## Testes 

- para executar o Teste utilize o comando `npm test`

- Aqui foi focado os __testes de aceitação__ no contexto da aplicação visa testar as respostas de sucesso e erros das rotas. (testes em cima do comportamento e resultado dos endpoints)
- utilizado o TestRunner [Mocha](https://mochajs.org/)
- foi separado o arquivo de libs/config.js em test e development, no test foi adicionado o atributo logging para não ter os console de sql poluindo o prompt
- no index foi adicionado o verbose:false para o cossign e exportado o app para que a dependencia supertest reveba o teste;
- também teve que configurar o boot.js e o arquivo config.js para executar de forma diferente dependendo da variavel de ambiente.
- foi criado uma pasta "testes" para criar as configurações de testes e centralizar os módulos de testes.

## Produção 
- utilizado o CORS para compartilhar recursos com origens diferentes
- utilizado `winston` e `morgan` para geraar arquivos de logs das requisições realizadas.
