import pandas as pd 
import json 
#Source : https://raw.githubusercontent.com/jpatokal/openflights/master/data/airlines.dat

airlines2csv = []
airlines2json = {}

fileptr = open('./data/airlines.csv','r',encoding='utf-8')
for line in fileptr.readlines():
    data = line.replace('"','').split(',')
    lowername = data[1].replace(' ','_').lower()
    name = data[1]
    icao = data[3]
    iata = data[4]
    callsign = data[5]
    country = data[6]

    airlines2csv.append([name,icao,iata,callsign,country])
    airlines2json[iata] = {
        'name' : name,
        'icao' : icao,
        'iata' : iata,
        'callsign' : callsign,
        'country' : country
    } 

print(airlines2csv[27])
csv_df = pd.DataFrame(columns=['name','icao','iata','callsign','country'],data=airlines2csv)
csv_df.to_csv('../Airlines.csv',index=False)
jsonExportFileptr= open('../Airlines_IATA.json','w',encoding='utf-8')
jsonExportFileptr.write( json.dumps(airlines2json,ensure_ascii=False))
print('{} length Done'.format(len(airlines2csv)))