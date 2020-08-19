import React , {useState} from 'react';
import axios from 'axios';
import handleAirport from './handleAirport';

export default async function requestSearchData(target,query,setAirport,destroySearchBox){
        await axios.get(`https://94rising.xyz/api/airport/airportname?target=${(query).toUpperCase()}`).then(
            response => {
                if(response.status === 200){
                    if(response.data.length >= 1){
                        const data = response.data; 
                        handleAirport(target,data,setAirport,destroySearchBox);
                    }
                }else if(response.status === 404){
                    console.log(response.status);
                }
            }).catch(

            );
        
}