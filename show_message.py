import asyncio
import datetime
from random import choice
import websockets
import json
from os import listdir, getcwd
from os.path import isfile, join, realpath, dirname
mypath = os.path.dirname(sys.executable)
print(mypath)


def imageFromDir(exists):
    files = [f for f in listdir(join(mypath, "images")) if isfile(join(mypath, "images", f))]
    filesButExisting = list(set(files) - set(exists))
    if len(filesButExisting) < 1:
        return choice(files)
    return choice(filesButExisting)
    

async def spawnImages(websocket):
    async for message in websocket:
        event = json.loads(message)
        if event["action"] == "spawn": 
            print("received from browser:", event["exists"])
            chosed = imageFromDir(event["exists"])
            print("sending to browser:", chosed)
            print("-------")
            await websocket.send(chosed)


async def main():
    async with websockets.serve(spawnImages, "localhost", 5678):
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())
