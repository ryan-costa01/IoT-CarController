const mqtt = require('mqtt');
const mongoose = require('mongoose');

async function connectToMQTT() {
    try {
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
    } catch (error) {
        console.error('Erro ao conectar:', error);
    }
}
async function main() {
    connectToMQTT();
    await mongoose.connect('mongodb://vitoreu:vibaryje7@mongo:27017');
    const schemaDados = new mongoose.Schema({
        velAtual: Number,
        acelAtual: Number,
        posiAtual: Number,
        dirAtual: String
      });
       const dados = JSON.stringify({
        velAtual: 1.2,
        acelAtual: 3.4,
        posiAtual: 56.7,
        dirAtual: 'Cachorro'
      
      })
      
      const Carrinho = mongoose.model("Carrinho", schemaDados);
      const data = new Carrinho(JSON.parse(dados))
      await data.save()
      const carrinhos = await Carrinho.find()
      console.log(carrinhos)

    } 




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
