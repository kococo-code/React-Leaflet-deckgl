import React , {useState,useEffect} from 'react';

function EachFlight(props){
    let [flights,setFlight] = useState(0)
    
    function ParsingFlights(){
        let data = [];
        for(let i =0; i<props.prices.length; i++){
            let price = ''
            let currency = ''
            if(props.prices.length>1){
                if(i != props.prices.length -1){
                    price = ''
                }else{
                    price = props.prices[i].price
                    currency = props.prices[i].currency
                }
            }else{
                price = props.prices[i].price
                currency = props.prices[i].currency
            }
            data.push({
                'operator' : props.prices[i].operator,
                'flight_number' : props.prices[i].flight_number,
                'departure' : props.prices[i].departure,
                'arrival' : props.prices[i].arrival,
                'departure_time' : props.prices[i].departure_time.substring(0,5),
                'departure_date' :  props.prices[i].departure_date,
                'arrival_time' : props.prices[i].arrival_time.substring(0,5),
                'arrival_date' :  props.prices[i].arrival_date,
                'price' : price,
                'currency' : currency
            })
        }
        setFlight(data);

    };
    function onclick(e){
        props.child_callback(flights);
    }
    function onHover(e){
        console.log(e.target.name);
    }
    useEffect(()=>{
        ParsingFlights();
    },[])
    if(flights.length ===1){
        return (
            <div onClick={onclick} className="ticket">
                    {flights.map((key)=>
                         <div className="eachFlight">
                             <div className="flightInfo">
                                 <span className="operator">{key.operator} </span>
                                <span className="flight_number">{key.flight_number}</span>
                            </div>
                        <div className="Airports">
                         <div className="departure_airport" onMouseEnter={onHover} name={key.departure}>{key.departure}</div>
                         <div className="arrival_airport">{key.arrival}</div>
                         </div>
                         <div className="time">
                            <div className="deaprture_time">{key.departure_time}</div>
                            <div className="arrival_time"> {key.arrival_time}</div>
                         </div>
                         <div className="date">
                            <div className="deaprture_date">{key.departure_date}</div>
                            <div className="arrival_date"> {key.arrival_date}</div>
                         </div>
                         <div className="prices">
                         <span className="price">{key.price} </span>
                         <span className="currency"> {key.currency}</span>
                         </div>
                     </div>
                    )}
            </div>
        )
    }else if(flights.length >= 2){
        let price = props.prices[0].price;
        let currency = props.prices[0].currency;
        let bookinglink = props.prices[0].bookinglink;
        return( 
        <div onClick={onclick} className="ticket">
                    {flights.map((key)=>
                         <div className="eachFlight">
                             <div className="flightInfo">
                                 <span className="operator">{key.operator} </span>
                                <span className="flight_number">{key.flight_number}</span>
                            </div>
                        <div className="Airports">
                         <div className="departure_airport">{key.departure}</div>
                         <div className="arrival_airport">{key.arrival}</div>
                         </div>
                         <div className="time">
                            <div className="deaprture_time">{key.departure_time}</div>
                            <div className="arrival_time"> {key.arrival_time}</div>
                         </div>
                         <div className="date">
                            <div className="deaprture_date">{key.departure_date}</div>
                            <div className="arrival_date"> {key.arrival_date}</div>
                         </div>
                     </div>
                    )}
                    <div className="prices">
                         <span className="price">{price} </span>
                         <span className="currency"> {currency}</span>
                    </div>
            </div>)
    }else{
        return(<div></div>)
    }
}

export default EachFlight