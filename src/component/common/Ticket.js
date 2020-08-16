import React , {useState,useEffect} from 'react';
import axios from 'axios';
export default function Ticket(props){
    async function getData(departure,arrival,departure_date){
        await axios.get(`http://www.94rising.xyz/api/price/getPrice?departure=${departure}&arrival=${arrival}&departure_date=${departure_date}`).then(
            req=>{
                if(req.status !== 404){
                    setPrices(req.data);                 
                }
                else{
                    setPrices(-1);
                }
                
            }).catch(
                error=>{
                    console.log(error)
                }
            )
    }
    const [prices,setPrices]= useState();
    const [parsedFlights , setParsedFlights] = useState();
    
    useEffect(()=>{
        getData('ICN','FRA','2020-08-20');
    },[])
    
    return(
        <div id="Prices"></div>
    )
}