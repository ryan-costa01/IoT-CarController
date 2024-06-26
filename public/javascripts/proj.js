const mqtt = require('mqtt');

const options = {
    clientId: 'Jesse',
    username: 'mqtt',
    password: 'mqtt_123_abc',
    port: 1883
};
const client = mqtt.connect('mqtt://igbt.eesc.usp.br', options);

client.on('connect', () => {
    console.log('Conectado ao broker MQTT.');
    const topic = 'jesse';
    const message = 'test message';
    console.log(`Mensagem: ${message}, Tópico: ${topic}`);
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('Erro ao publicar mensagem:', err);
        } else {
            console.log('Mensagem publicada com sucesso.');
        }
    });
    client.subscribe(topic, (err) => {
        if (err) {
            console.error('Erro ao se inscrever no tópico:', err);
        } else {
            console.log(`Inscrito no tópico: ${topic}`);
        }
    });
});

client.on('message', (topic, message) => {
    console.log(`Mensagem recebida: ${message.toString()} no tópico: ${topic}`);
});

client.on('error', (error) => {
    console.error('Erro:', error);
});

client.on('close', () => {
    console.log('Conexão encerrada.');
});

client.on('end', () => {
    console.log('Conexão terminada.');
});

function publishToMQTT(topic, message) {
    client.publish(topic, message, (err) => {
        if (err) {
            console.error('Erro ao publicar mensagem:', err);
        } else {
            console.log(`Mensagem publicada: ${message} no tópico: ${topic}`);
        }
    });
}

module.exports = { publishToMQTT };




/*const client = await mqtt.connectAsync('mqtt://test.mosquitto.org');
const topic = 'jesse';
const message = 'test message'; 

client.on('connect', () => {
    console.log(`Is client connected: ${client.connected}`);    
    if (client.connected === true) {
        console.log(`message: ${message}, topic: ${topic}`); 
        // publish message        
        client.publish(topic, message);
    }

    // subscribe to a topic
    client.subscribe(topic);
});

// receive a message from the subscribed topic
client.on('message',(topic, message) => {
    console.log(`message: ${message}, topic: ${topic}`); 
});

// error handling
client.on('error',(error) => {
    console.error(error);
    process.exit(1);
});*/