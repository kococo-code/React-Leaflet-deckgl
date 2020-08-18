import React , {useState} from 'react';
import axios from 'axios';
import handleAirport from './handleAirport';

export default async function requestSearchData(target,setAirport,destroySearchBox){
        
        if(window.sessionStorage.getItem('data_') === null){
            window.sessionStorage.setItem('data_',target.value);
        }
        if(window.sessionStorage.getItem('data_') !== target.value){
            await axios.get(`https://94rising.xyz/api/airport/airportname?target=${(target.value).toUpperCase()}`).then(
                response => {
                    if(response.status === 200){
                        if(response.data.length >= 1){
                            const data = response.data; 
                            handleAirport(target,data,setAirport,destroySearchBox);
                        }
                    }else{
                        console.log(response.status);
                    }
                }
            ).catch(
            ()=>{ 
                console.log("Not Found")
            })
        }   
}