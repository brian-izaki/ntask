# Projeto do livro de [API com Node da Casa do código](https://www.casadocodigo.com.br/products/livro-apis-nodejs)

## Necessário para executar:

- Node
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
