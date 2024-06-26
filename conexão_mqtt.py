import paho.mqtt.client as mqtt
import time
import json
import RPi.GPIO as GPIO
import time

broker = "igbt.eesc.usp.br"
port = 1883 
topic = "jesse"

aceleracao = 0
direcao = 0

motor_esquerdo_pwm = 12
motor_esquerdo_in1 = 14
motor_esquerdo_in2 = 15

motor_direito_pwm = 13
motor_direito_in3 = 23
motor_direito_in4 = 24

tensao_entrada = 12.0
tensao_maxima_motor = 8
divisor_tensao = tensao_maxima_motor/tensao_entrada

GPIO.setmode(GPIO.BCM)
GPIO.setup(motor_esquerdo_pwm, GPIO.OUT)
GPIO.setup(motor_esquerdo_in1, GPIO.OUT)
GPIO.setup(motor_esquerdo_in2, GPIO.OUT)
GPIO.setup(motor_direito_in3, GPIO.OUT)
GPIO.setup(motor_direito_in4, GPIO.OUT)
GPIO.setup(motor_direito_pwm, GPIO.OUT)



pwm_motor_esquerdo = GPIO.PWM(motor_esquerdo_pwm,1000)
pwm_motor_direito = GPIO.PWM(motor_direito_pwm,1000)

pwm_motor_direito.start(0)
pwm_motor_esquerdo.start(0)

# Função que será chamada quando o cliente se conectar ao broker
def on_connect(client, userdata, flags, rc, properties=None):
    print(f"Conectado ao broker com código {rc}")
    if rc == 0:
        print("Conexão estabelecida com sucesso")
        # Inscrever-se no tópico para receber mensagens
        client.subscribe(topic)
        # Publicar o vetor de dados
        time.sleep(1) 
    else:
        print("Falha na conexão, código de retorno %d\n", rc)

# Função que será chamada quando uma mensagem for recebida
def on_message(client, userdata, msg):
    print(f"Mensagem recebida no tópico {msg.topic}: {msg.payload.decode()}")
    global aceleracao
    global direcao
    # Verificar se a mensagem recebida é igual aos dados enviados
    #received_data = json.loads(msg.payload.decode())
    if(msg.payload.decode() == "Direita"):
        direcao += 10
        if direcao > 100:
            direcao = 100
        if(direcao>0):
            GPIO.output(motor_esquerdo_in1,GPIO.LOW)
            GPIO.output(motor_esquerdo_in2,GPIO.HIGH)
        pwm_motor_esquerdo.ChangeDutyCycle(abs(direcao)*divisor_tensao)
    elif(msg.payload.decode() == "Esquerda"):
        direcao -=10
        if(direcao <-100):
            direcao = -100
        if(direcao<0):
            GPIO.output(motor_esquerdo_in1,GPIO.HIGH)
            GPIO.output(motor_esquerdo_in2,GPIO.LOW)
        pwm_motor_esquerdo.ChangeDutyCycle(abs(direcao)*divisor_tensao)
    elif(msg.payload.decode() == "Cima"):
        aceleracao =  aceleracao + 10
        if(aceleracao>100):
            aceleracao = 100
        if(aceleracao>0):
            GPIO.output(motor_direito_in3,GPIO.HIGH)
            GPIO.output(motor_direito_in4,GPIO.LOW)
        pwm_motor_direito.ChangeDutyCycle(abs(aceleracao)*divisor_tensao)
    elif(msg.payload.decode() == "Baixo"):
        aceleracao =  aceleracao - 10
        if(aceleracao<-100):
            aceleracao = -100
        if(aceleracao<0):
            GPIO.output(motor_direito_in3,GPIO.LOW)
            GPIO.output(motor_direito_in4,GPIO.HIGH)
        pwm_motor_direito.ChangeDutyCycle(abs(aceleracao)*divisor_tensao)
    #if received_data == data:
     #   print("Os dados recebidos são iguais aos dados enviados.")
    #else:
     #   print("Os dados recebidos são diferentes dos dados enviados.")
    #client.disconnect()


GPIO.output(motor_esquerdo_in1,GPIO.LOW)
GPIO.output(motor_esquerdo_in2,GPIO.HIGH)
GPIO.output(motor_direito_in3,GPIO.HIGH)
GPIO.output(motor_direito_in4,GPIO.LOW)

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

#while True:
        





#client.loop_stop()
