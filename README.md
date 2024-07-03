<a name="readme-top"></a>

# IoT-CarController
Repositório para a matéria de Projetos em IoT 2024.1

Esse é um Projeto de IoT voltado para o controle remoto de um Veículo Elétrico. As funcionalidades dessa aplicação consiste em realizar o controle de direção do veículo, bem como receber imagem de vídeo atraves de uma câmera implementada no protótipo. Todo esse controle será feito atraves de uma página WEB, que mostrará uma interface com o vídeo que o veículo estará gravando. 
   
## :file_folder: Estrutura de Diretórios

A estrutura de arquivos do projeto Front-End é organizada da seguinte forma:

.

├── app.js

├── bin

│ └── www

├── package.json

├── public

│ ├── images

│ ├── javascripts

│ │ ├── proj.js

│ │ └── script.js

│ └── stylesheets

│ └── style.css

├── routes

│ ├── index.js

│ └── users.js

└── views

├── error.pug

├── index.pug

└── layout.pug


### Descrição dos Arquivos e Diretórios

- `app.js`: Arquivo principal da aplicação que configura e inicializa o servidor Express, define as rotas e gerencia os middlewares.

- `bin/www`: Script de inicialização do servidor HTTP, configurando a porta e lidando com eventos de erro e de conexão.

- `package.json`: Arquivo de configuração do npm que lista as dependências do projeto e scripts úteis para executar e gerenciar a aplicação.

- `public/`: Diretório que contém arquivos estáticos acessíveis pela web.
  - `images/`: Diretório para armazenar imagens utilizadas pela aplicação.
  - `javascripts/`: Diretório para arquivos JavaScript utilizados no Front-End.
    - `proj.js`: Arquivo JavaScript para configuração e controle do projeto IoT.
    - `script.js`: Arquivo JavaScript para manipulação da interface web e comunicação via WebSocket.
  - `stylesheets/`: Diretório para arquivos CSS, incluindo `style.css`, que define o estilo visual da aplicação.

- `routes/`: Diretório que contém os módulos de rotas da aplicação.
  - `index.js`: Define as rotas principais da aplicação.
  - `users.js`: Define as rotas relacionadas a usuários.

- `views/`: Diretório que contém as views da aplicação, utilizando o motor de templates Pug.
  - `error.pug`: Template para páginas de erro.
  - `index.pug`: Template para a página principal.
  - `layout.pug`: Template base utilizado pelas outras views.


## :rocket: Rodando o projeto
No terminal do Virtualhost:

1. Clone o repositório
   ```sh
   git clone git@github.com:VitorFMaiaB/IoT-CarController.git
   ```
2. Instale as dependências
   ```cmd
   npm install
   ```
3. Inicie a aplicação
   ```cmd
   npm start
   ```
## :memo: License

Distributed under the GNU General Public License v3.0. See `LICENSE.txt` for more information.

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/ryan-costa01">
        <img src="https://avatars.githubusercontent.com/u/63657064?s=400&u=cae3d15c188ed977d1713fb373a5a42a145ae3ba&v=4" width="100px;" alt="Foto de Ryan Costa no GitHub"/><br>
        <sub>
          <b>Ryan Costa</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/VitorFMaiaB">
        <img src="https://avatars.githubusercontent.com/u/115305435?v=4" width="100px;" alt="Foto de Vitor Maia no Github"/><br>
        <sub>
          <b>Vitor Maia</b>
        </sub>
      </a>
    </td>
