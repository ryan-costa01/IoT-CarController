#!/usr/bin/env python

# WS server that sends camera streams to a web server using opencv


import asyncio
import websockets
import cv2
import webbrowser

async def time(websocket, path):
    camera = True
    vid = cv2.VideoCapture(0) if camera else cv2.VideoCapture('videos/video1.mp4')
    
    try:
        while vid.isOpened():
            img, frame = vid.read()
            frame = cv2.resize(frame, (640, 480))
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
            encoded_img = cv2.imencode('.jpg', frame, encode_param)[1]
            await websocket.send(encoded_img.tobytes())
            
            # Verifica se a tecla 'p' foi pressionada
            key = cv2.waitKey(1) & 0xFF
            if key == ord('p'):
                break
                
    except Exception as e:
        print("Erro:", e)
        
    finally:
        vid.release()


# Abrir o navegador com o arquivo index.html
webbrowser.open_new_tab('file:///home/ryancosta/Documents/Toradex/Python-Javascript-Websocket-Video-Streaming-/index.html')

start_server = websockets.serve(time, "127.0.0.1", 9997)
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()