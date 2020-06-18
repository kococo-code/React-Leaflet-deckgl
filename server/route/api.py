from flask import Blueprint , request 
import glob 
import json
import os
api_blueprint = Blueprint('api',__name__,url_prefix='/api')

@api_blueprint.route('/price',methods=['GET'])
def price():
    def SearchData(data):
        path = os.getcwd()+ '/dataset/Price/{departure}_{arrival}*.json'.format(departure=data['departure'],arrival=data['arrival'])
        if len(data) == 3:
            path = os.getcwd()+ '/dataset/Price/{departure}_{arrival}_{departuredate}.json'.format(departure=data['departure'],arrival=data['arrival'],departuredate=data['departuredate'])
        if len(data) == 4:
            path = os.getcwd() +'/dataset/Price/{departure}_{arrival}_{departuredate}_{arrivaldate}.json'.format(departure=data['departure'],arrival=data['arrival'],departuredate=data['departuredate'],arrivaldate=data['arrivaldate'])
        print(path)
        filelist = glob.glob(path)
        if len(filelist) > 0:
            fptr = open(filelist[0],'r',encoding='utf-8')
            prices = json.loads(fptr.read())
            
            return prices
        else:
            return -1
    req = request.query_string
    q = (str(req).replace("b'",'').replace("'",'').split('&'))
    parsed_list = ['departure','arrival','departuredate','arrivaldate']
    parsed_dict = {}
    for i in range(len(q)):
        parsed_dict[parsed_list[i]] = q[i].split('=')[1]


    # Will Be Change by SQL
    # This is legacy
    data = SearchData(parsed_dict)
    if data != -1:
        return data
    else:
        return 'Not Found'

