import requests 
from bs4 import BeautifulSoup 

#req = requests.get("https://en.wikipedia.org/wiki/List_of_countries_by_past_fertility_rate")
file = open('index.html','r')
soup = BeautifulSoup(file,'html.parser')
table =soup.find_all('table')
tr = table[0].find_all('tr')
dataset = []
for td in tr:
    td = td.text.replace(' ','').replace('\n','').replace('\t','').replace('\r','')
    print(ord(td[0]),td[0])
    if(ord(td[0].lower()) >= 97 and ord(td[0].lower()) <=122 ):
        print(td)