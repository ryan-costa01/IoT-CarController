openSocket = () => {

    socket = new WebSocket("ws://127.0.0.1:9997/");
    let msg = document.getElementById("msg");
    socket.addEventListener('open', (e) => {
        document.getElementById("status").innerHTML = "Opened";
    });
    socket.addEventListener('message', (e) => {
        let ctx = msg.getContext("2d");
        let image = new Image();
        image.src = URL.createObjectURL(e.data);
        image.addEventListener("load", (e) => {
            ctx.drawImage(image, 0, 0, msg.width, msg.height);
        });
    });
}

document.addEventListener('keydown', function(event) {
    const directionBox = document.getElementById('directionBox');
    let direction = '';

    switch(event.key) {
        case 'ArrowUp':
            direction = 'Up';
            break;
        case 'ArrowDown':
            direction = 'Down';
            break;
        case 'ArrowLeft':
            direction = 'Left';
            break;
        case 'ArrowRight':
            direction = 'Right';
            break;
        default:
            break;
    }

    if (direction !== '') {
        directionBox.textContent = 'Direction: ' + direction;
    }
});