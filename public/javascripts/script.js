document.addEventListener('DOMContentLoaded', function() {
  let isConnected = false;
  const directionDisplay = document.getElementById('current-direction');
  const connectButton = document.getElementById('connect-button');
  const disconnectButton = document.getElementById('disconnect-button');
  const videoCanvas = document.getElementById('video-canvas');
  const ctx = videoCanvas.getContext('2d');
  let socket;

  connectButton.addEventListener('click', function() {
    if (!isConnected) {
      const wsUrl = (location.protocol === 'https:') ? 'wss://' : 'ws://';
      const fullWsUrl = wsUrl + 'vibaryje.igbt.eesc.usp.br'; // Add port number if necessary
      console.log('Connecting to WebSocket:', fullWsUrl);
      socket = new WebSocket(fullWsUrl);
      socket.binaryType = 'arraybuffer';

      socket.addEventListener('open', function() {
        isConnected = true;
        directionDisplay.textContent = 'Conectado. Use as setas do teclado.';
        console.log('WebSocket connection opened.');
      });

      socket.addEventListener('message', function(event) {
        const imageData = new Uint8Array(event.data);
        const blob = new Blob([imageData], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);
        const img = new Image();
        img.onload = function() {
          ctx.drawImage(img, 0, 0, videoCanvas.width, videoCanvas.height);
          URL.revokeObjectURL(url);
        };
        img.src = url;
      });

      socket.addEventListener('close', function() {
        isConnected = false;
        directionDisplay.textContent = 'Desconectado';
        console.log('WebSocket connection closed.');
      });

      socket.addEventListener('error', function(event) {
        console.error('WebSocket error observed:', event);
      });

      document.addEventListener('keydown', handleDirectionKey);
    }
  });

  disconnectButton.addEventListener('click', function() {
    if (isConnected) {
      socket.close();
      isConnected = false;
      directionDisplay.textContent = 'Desconectado';
      document.removeEventListener('keydown', handleDirectionKey);
    }
  });

  function handleDirectionKey(event) {
    let direction;
    switch (event.key) {
      case 'ArrowUp':
        direction = 'Cima';
        break;
      case 'ArrowDown':
        direction = 'Baixo';
        break;
      case 'ArrowLeft':
        direction = 'Esquerda';
        break;
      case 'ArrowRight':
        direction = 'Direita';
        break;
      default:
        direction = null;
    }
    if (direction) {
      directionDisplay.textContent = direction;
      fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ direction: direction })
      })
      .then(response => response.text())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
});
