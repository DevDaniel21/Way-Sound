# Como usar o Backend

## Tecnologias utilizadas

- Node.JS 22.13.1
- Express
- MySQL
- API Rest
- DotEnv
- Nodemon
- Sucrase

## Comandos de instalação:
- npm init -y
- npm i nodemon -D
- npm i --save-dev sucrase
- npm i dotenv
- npm i express
- npm i multer


## Conectando ao Banco de Dados
- npm i sequelize
- npm i -D sequelize-cli
- npm i mysql2

## Ordem de criação de tabela
Ordem para criar uma Tabela:
- Model
- ModelConnection
- Controller
- Routes
- App
- npx sequelize migration:create --name=tabelNome
- npx sequelize db:migrate

## Migrando para o banco de dados
- npx sequelize migration:create --name=nomeTabela

## Depois de ajustar o arquivo de migrations
- npx sequelize db:migrate