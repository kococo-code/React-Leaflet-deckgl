import requests 
import pandas as pd 
from bs4 import BeautifulSoup 

airport_arr = ['A','B','C','D','E','F','G','H','I','J','K','L','N','M','O','P','Q','R','S','T','U','V','W','X','Y','Z']

airports = list()
for element in airport_arr:
    url = "https://en.wikipedia.org/wiki/List_of_airports_by_IATA_airport_code:_{element}".format(element=element)
    print(url)
    req = requests.get(url)
    soup = BeautifulSoup(req.text,'lxml')
    tr = soup.find_all('tr')
    for t_row in tr:
        cnt = 0
        for td in t_row.find_all('td'):
            if cnt == 0:
                code = td.text 
                if len(code) == 3:
                    airports.append(td.text)
            cnt+=1


df = pd.DataFrame(columns=['IATA'],data=airports)
df.to_csv('../dataset/IATA_code.csv')