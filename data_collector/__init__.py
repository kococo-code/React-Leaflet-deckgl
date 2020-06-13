import requests
import pandas as pd
url = "https://iata-and-icao-codes.p.rapidapi.com/airlines"

headers = {
    'x-rapidapi-host': "iata-and-icao-codes.p.rapidapi.com",
    }

response = requests.request("GET", url, headers=headers)
airline = pd.DataFrame(columns=['iata_code','name','icao_code'],data=response.json())
airline.to_csv('airlines.csv')
