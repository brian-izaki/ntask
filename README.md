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

- Aqui foi focado os **testes de aceitação** no contexto da aplicação visa testar as respostas de sucesso e erros das rotas. (testes em cima do comportamento e resultado dos endpoints)
- utilizado o TestRunner [Mocha](https://mochajs.org/)
- foi separado o arquivo de libs/config.js em test e development, no test foi adicionado o atributo logging para não ter os console de sql poluindo o prompt
- no index foi adicionado o verbose:false para o cossign e exportado o app para que a dependencia supertest reveba o teste;
- também teve que configurar o boot.js e o arquivo config.js para executar de forma diferente dependendo da variavel de ambiente.
- foi criado uma pasta "testes" para criar as configurações de testes e centralizar os módulos de testes.

## Docmentação da api

- foi utilizado [apidoc](https://apidocjs.com/) para gerar documentação das rotas da API REST

- utilize o comando `npm apidoc` para gerar uma documentação em html automaticamente
- para que o apiDoc gere uma documentação é necessário utilizar o seguite exemplo:
```
/**
 * @api {método HTTP} rota Descrição sobre a rota
 * @apiGroup Titulo que a rota faz parte
 * ... visitar a documentação para mais opções
 */
```
- Para saber onde deve ser lido os comentários que geram a doc, é passado o caminho pelo prompt (-i) e onde deve ser gerado os aquivos HTML (-o) pelo seguinte código: `apidoc -i routes/ -o public/apidoc`
- exemplos podem ser vistos na pasta [routes](https://github.com/brian-izaki/ntask/tree/main/routes)
- para acessar a página HTML da documentação é necessário iniciar o servidor e depois ir para o seguinte link *https://localhost:3000/apidoc*

## Produção

- utilizado o CORS para compartilhar recursos com origens diferentes
- utilizado `winston` e `morgan` para geraar arquivos de logs das requisições realizadas.
- utilizado a dependência [helmet](https://helmetjs.github.io/) para proteger mais a API
  - é um middleware para express que auxilia contra alguns ataques básicos como XSS, ClickJacking, configura regras para HTTP Public key pinning, etc

## Certificado HTTPS
- foi gerado um certificado com o openssl

- seguindo os seguintes passos:
  - Gerando chave privada 
  ```shell
  openssl genrsa -des3 -out server.key 1024
  ```
  - Gerando CSR (Certificate Signing Request)
  ```shell
  openssl req -new -key server.key -server.csr
  ```
  - Removendo o pedido de senha
  ```shell
  cp server.key server.key.org
  openssl rsa -in server.key.org -out server.key
  ```
  - Gerando o certificado auto-assinado
  ```shell
  openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
  ```
  - depois foi utilizado o módulo nativo do node para https no `libs/boot.js` para o servidor instancie no *https* e para a leitura dos certificados o *fs*
- [mais informações](https://www.akadia.com/services/ssh_test_certificate.html) 