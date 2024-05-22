import paho.mqtt.client as mqtt
import time
import json


broker = "igbt.eesc.usp.br"
port = 1883 
topic = "jesse"


data = [0, 1, 2, 3]

# Função que será chamada quando o cliente se conectar ao broker
def on_connect(client, userdata, flags, rc, properties=None):
    print(f"Conectado ao broker com código {rc}")
    if rc == 0:
        print("Conexão estabelecida com sucesso")
        # Inscrever-se no tópico para receber mensagens
        client.subscribe(topic)
        # Publicar o vetor de dados
        time.sleep(1) 
        client.publish(topic, json.dumps(data))
    else:
        print("Falha na conexão, código de retorno %d\n", rc)

# Função que será chamada quando uma mensagem for recebida
def on_message(client, userdata, msg):
    print(f"Mensagem recebida no tópico {msg.topic}: {msg.payload.decode()}")
    # Verificar se a mensagem recebida é igual aos dados enviados
    #received_data = json.loads(msg.payload.decode())
    #if received_data == data:
     #   print("Os dados recebidos são iguais aos dados enviados.")
    #else:
     #   print("Os dados recebidos são diferentes dos dados enviados.")
    #client.disconnect()


client = mqtt.Client()

# Definir as funções de callback
client.on_connect = on_connect
client.on_message = on_message

client.username_pw_set(username="mqtt", password="mqtt_123_abc")

client.connect(broker, port, 60)

client.loop_forever()
# Iniciar o loop do cliente para processar callbacks e manter a conexão
#client.loop_start()

# Manter o script rodando por tempo suficiente para enviar e receber a mensagem
#time.sleep(10)


#lient.loop_stop()
