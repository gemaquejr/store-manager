# Store Manager

Essa aplicação é uma API RESTful de gerenciamentos de vendas em MySQL.

![preview](.github/preview.gif)

Aplicação que consiste em desenvolver uma API de gerenciamentos de vendas, onde é possível cadastrar, visualizar, pesquisar, editar e excluir informações.

O projeto foi para praticar a construção de API's em CRUD, utilizando endpoints para ler e escrever arquivos em MySQL.

## 🚀 Tecnologia

- ⚡ Docker é uma plataforma open source que facilita a criação e administração de ambientes isolados dentro de um container.

- ⚡ Node.js é um ambiente de execução JavaScript que permite executar aplicações desenvolvidas com a linguagem de forma autônoma, sem depender de um         navegador.

- ⚡ MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface.

- ⚡ MySQL Workbench é uma ferramenta de design de banco de dados visual que integra desenvolvimento SQL, administração, design de banco de dados, criação     e manutenção em um único ambiente de desenvolvimento integrado para o sistema de banco de dados MySQL.

## ✋🏻 Pré-requisitos

- [git](https://git-scm.com/downloads): Ferramenta para gerenciar o código-fonte

- [Visual Studio Code](https://code.visualstudio.com/): Editor de Código Fonte

- [Docker](https://www.docker.com/): Software de código aberto usado para implantar aplicativos dentro de containers virtuais.

- [Node.js](https://nodejs.org/en): Software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos     JavaScript fora de um navegador web.

- [MySQL](https://www.mysql.com/): Sistema de gerenciamento de banco de dados (SGBD) relacional, ou seja, que utiliza a linguagem SQL como interface.

- [MySQL Workbench](https://www.mysql.com/products/workbench/): MySQL é uma ferramenta de design de banco de dados visual que integra desenvolvimento       SQL, administração, design de banco de dados, criação e manutenção em um único ambiente de desenvolvimento integrado para o sistema de banco de dados     MySQL.

## :hammer_and_wrench: Antes de iniciar o projeto.

No diretório do projeto, instale as dependências e inicialize o projeto:

### `npm install`

Instala as dependências.

### `Rodando a aplicação com o Docker:`

Na pasta app do projeto, suba o container talker_manager utilizando o docker-compose.yml. Utilize o comando:

   - `docker-compose up -d`

Entre no terminal do container e digite:

   - `docker exec -it talker_manager bash`
   
Inicie o servidor:

   - `npm run dev`
