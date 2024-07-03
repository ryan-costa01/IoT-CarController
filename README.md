<a name="readme-top"></a>

# IoT-CarController
Repositório para a matéria de Projetos em IoT 2024.1


Este projeto é uma aplicação de IoT voltada para o controle remoto de um veículo elétrico. As funcionalidades principais incluem o controle de direção do veículo e a recepção de imagens de vídeo transmitidas por uma câmera instalada no protótipo. A interface para controle e visualização é uma página web que exibe o vídeo em tempo real e permite o controle da direção do veículo através de comandos de teclado.

## :wrench: Explicação do programa
### Interface Web

A implementação do servidor web utiliza a biblioteca `Express` em JavaScript, combinada com `HTML` e `CSS` para o Front-End. 

### Hardware

O hardware utilizado para controlar e alimentar o veículo é a placa `Raspberry PI 4`, que proporciona a robustez e a capacidade de processamento necessárias para as tarefas do projeto.

### Streaming de Vídeo e Processamento de Imagem

Para o streaming e processamento das imagens de vídeo, a biblioteca `OpenCV` em Python é utilizada. Esta biblioteca permite a aplicação de técnicas de acesso a câmera e transmissão de vídeo, contribuindo para a navegação e segurança do veículo. A comunicação entre o servidor e o cliente é feita através do protocolo `WebSocket`, garantindo uma comunicação em tempo real eficiente.


### Funcionalidades
- **Interface Gráfica:** A interface web mostra o vídeo em tempo real do que a câmera do veículo está capturando.
- **Controle de Direção:** Os usuários podem controlar a direção do veículo utilizando as teclas de seta do teclado.
- **Verificação de Conexão:** O programa verifica se o veículo está conectado corretamente e alerta em caso de falhas de conexão.


## :rocket: Rodando o projeto
No terminal da Raspberry PI, digite os seguintes comandos:

1. Clone o repositório
   ```sh
   git clone git@github.com:ryan-costa01/IoT-CarController.git
   ```
2. Acesse a página web da aplicação
   ```cmd
   http://vibaryje.eesc.igbt.usp.br
   ```
3. Inicialize o programa
   ```cmd
   cd IoT-CarController/VideoWeb
   python3 main.py
   ```
Em seguida, no site, pressione a tecla `conectar`para iniciar a conexão. Caso tudo ocorra sem erros, o dispositivo fará a conexão `mqtt` e `websocket` com o servidor. 

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
