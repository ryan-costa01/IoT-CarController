import paho.mqtt.client as mqtt

# MQTT Config
MQTT_BROKER = 'igbt.eesc.usp.br'
MQTT_PORT = 1883
MQTT_TOPIC = 'jesse'
MQTT_USERNAME = 'mqtt'
MQTT_PASSWORD = 'mqtt_123_abc'

current_direction = "N/A"

def on_connect(client, userdata, flags, rc):
    print(f"Connected to MQTT Broker with result code {rc}")
    client.subscribe(MQTT_TOPIC)

def on_message(client, userdata, msg):
    global current_direction
    current_direction = msg.payload.decode()
    print(f"Direction received: {current_direction}")

def start_mqtt():
    client = mqtt.Client()
    client.username_pw_set(MQTT_USERNAME, MQTT_PASSWORD)
    client.on_connect = on_connect
    client.on_message = on_message

    client.connect(MQTT_BROKER, MQTT_PORT, 60)
    client.loop_start()
    return client

def stop_mqtt(client):
    client.loop_stop()
    client.disconnect()