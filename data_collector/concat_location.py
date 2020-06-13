import pandas as pd
import requests
airports = pd.read_csv('../dataset/IATA_code.csv')
airports_with_location= list()
url = "https://cometari-airportsfinder-v1.p.rapidapi.com/api/cities/by-airports"
headers = {
    'x-rapidapi-host': "cometari-airportsfinder-v1.p.rapidapi.com",
    'x-rapidapi-key': "nI4ULc1zVemshtAJPRAg38HMX11op1CylKpjsnN95SHekKzZ3n"
    }

for code in airports['IATA']:

    querystring = {"code": code}

    req = requests.request("GET", url, headers=headers, params=querystring).json()
    if len(req) != 0:
        req = req[0]
        country = req['country']
        longitude = req['location']['longitude']
        latitude = req['location']['latitude']
        print(len(airports_with_location),code,country,longitude,latitude)
        airports_with_location.append([code,country,longitude,latitude])
    else:
        airports_with_location.append([code,0,'inf','inf'])

df = pd.DataFrame(columns=['IATA','Country','longitude','latitude'],data=airports_with_location)
df.to_csv('../dataset/airports_with_location.csv')