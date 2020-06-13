# https://rapidapi.com/vacationist/api/iata-and-icao-codes?endpoint=apiendpoint_6168bafb-dad6-4b38-b22a-8ae465adc73e
import pandas as pd 
import requests

url = "https://iata-and-icao-codes.p.rapidapi.com/airlines"

headers = {
    'x-rapidapi-host': "iata-and-icao-codes.p.rapidapi.com",
    }

response = requests.request("GET", url, headers=headers)
