import requests
import json 
import datetime 
import math
DATE_SCALE = 7

def dateChanger(now):
    return now - (60*60*24*DATE_SCALE)

now = math.ceil(datetime.datetime.now().timestamp())
past = dateChanger(now)
print(past ,now)

url = 'https://opensky-network.org/api/flights/departure?airport=RKSI&begin={past}&end={now}'.format(past=past,now=now)
req = requests.get(url)
route = json.dumps(req.text)