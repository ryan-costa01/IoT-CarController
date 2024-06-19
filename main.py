#!/usr/bin/env python

import asyncio
from broker import start_mqtt, stop_mqtt
from Video import send_video

async def main():
    # Start MQTT client
    mqtt_client = start_mqtt()

    # Start sending video
    await send_video()

    # Stop the MQTT client when done
    stop_mqtt(mqtt_client)

if __name__ == "__main__":
    asyncio.get_event_loop().run_until_complete(main())