#!/usr/bin/env python

# WS server that sends camera streams to a web server using opencv


import asyncio
import websockets
import cv2

async def send_video():
    uri = "ws://localhost:3000"
    async with websockets.connect(uri) as websocket:
        vid = cv2.VideoCapture(0)
        
        try:
            while vid.isOpened():
                img, frame = vid.read()
                frame = cv2.resize(frame, (640, 480))
                encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 65]
                encoded_img = cv2.imencode('.jpg', frame, encode_param)[1]
                await websocket.send(encoded_img.tobytes())
                
                key = cv2.waitKey(1) & 0xFF
                if key == ord('p'):
                    break
                    
        except Exception as e:
            print("Erro:", e)
            
        finally:
            vid.release()
