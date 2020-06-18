import pandas as pd 
import json
# Source : https://openflights.org/data.html#airport
file = open('./data/airport.csv','r',encoding='utf-8')
continents = open('../dataset/Countries.json','r')
continents = json.loads(continents.read())
exportData = []
exportDataJson = {}
Countries = {}
for line in file.readlines():
    data = line.replace('"','').split(',')
    airportName = data[1]
    city = data[2]
    Country = data[3]
    IATA_CODE = data[4]
    ICAO_CODE = data[5]
    latitude = data[6]
    longitude = data[7]
    continent = ''
    if Country in Countries.keys():
        continent = continents[Country]
    else:
        continent = data[11].split('/')[0]
    exportData.append([airportName,city,Country,IATA_CODE,ICAO_CODE,latitude,longitude,continent])
    exportDataJson[ICAO_CODE] = {
        'name' : airportName,
        'city' : city,
        'country' : Country,
        'iata' : IATA_CODE,
        'icao' : ICAO_CODE,
        'latitude' : latitude,
        'longitude' : longitude,
        'continent' : continent
    }
#for key,value in exportDataJson.items():
#    if value['country'] not in Countries:
#        if value['continent'] != '\\N':
#            Countries[value['country']] = value['continent']
#CountriesjsonExportFileptr = open('./dataset/Countries.json','w',encoding='utf-8')
#CountriesjsonExportFileptr.write( json.dumps(Countries,ensure_ascii=False))

jsonExportFileptr= open('../dataset/Airports_IATA.json','w',encoding='utf-8')
jsonExportFileptr.write( json.dumps(exportDataJson,ensure_ascii=False))
csvDataFrame = pd.DataFrame(columns=['name','city','country','iata','icao','latitude','longitude','continent'],data=exportData)
csvDataFrame.to_csv('./dataset/Airports.csv',index=False)   