import React ,{useState,useEffect} from 'react';
import EachFlight from './flight_hook';
import axios from 'axios';
function Price(props){
    async function getData(departure,arrival,departure_date){
        await axios.get(`http://www.94rising.xyz/api/price/getPrice?departure=${departure}&arrival=${arrival}&departure_date=${departure_date}`).then(
            req=>{
                if(req.data !== 'Not Found'){
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
    async function getAirportInformation(departure,arrival){
        await axios.get(`http://www.94rising.xyz/api/airport/flightsairport?departure=${departure}&arrival=${arrival}`).then(
            req=>{
                setDeparture(req.data.departure);
                setArrival(req.data.arrival);
            }).catch(
                error=>{
                    console.log(error)
                }
            )
    }
    
    const [prices , setPrices] = useState(0);
    const [departure,setDeparture] = useState([]);
    const [arrival,setArrival] = useState([]);
    // ComponentdidMount 
    useEffect(()=>{
        getData(props.departure,props.arrival,props.departure_date);
        getAirportInformation(props.departure,props.arrival);
    },[])
    
    if(prices !== -1){
        let keys = Object.keys(prices);

        return (<div className="FlightsInformation">
            <div className="AirportInfo">
                <div className="AirportAttr">
                <div className="Departure">Departure</div>
                <div className="DepartureAirport">{departure.iata}</div>
                <div className="Arrival">Arrival</div>
                <div className="ArrivalAirport" >{arrival.iata}</div>
                <div className="Distance"></div>
                </div>
            </div>
            <div>
                {keys.map((key)=>
                    <EachFlight child_callback={props.child_callback}prices={prices[key]}></EachFlight>
                )}
            </div>
        </div>)
    }else{
        return (<div className="FlightsInformation">
        <div className="AirportInfo">
            <div className="AirportAttr">
            <div className="Departure">Departure</div>
            <div className="DepartureAirport">{departure.iata}</div>
            <div className="Arrival">Arrival</div>
            <div className="ArrivalAirport" >{arrival.iata}</div>
            <div className="Distance"></div>
            </div>
        </div>
        <div className="FlightsInformation" id="Notfound">
            Not Found
        </div>
        </div>)
    }
    
    
}

export default Price;



