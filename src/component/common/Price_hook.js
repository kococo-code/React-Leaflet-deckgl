import React ,{useState,useEffect} from 'react';
import EachFlight from './flight_hook';
import axios from 'axios';
import test from './testDataset.json';
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
    const [parsedFlights , setFlights] = useState();
    let flights = new Map();

    function onClick(e){
        let node = e.target;
        let relativeFlightIndex = -1;
        while(true){
            if(node.hasAttribute('id') === true){
                relativeFlightIndex = node.id.split('_')[1];
                break;
            }
            node = node.parentNode;          
        }
        console.log(flights.get(parseInt(relativeFlightIndex)));
    }
    
    function displayTickets(){
        const PriceElement = document.getElementById('Prices');
        
        function appendNode(tickets){        
            const flightTicket =  document.createElement('div');
            flightTicket.setAttribute('class','flightTicket');

            tickets.forEach((ticket,value)=>{
                const oneflightsTicket = document.createElement('div');
                
                if(value < tickets.length -1){
                    oneflightsTicket.setAttribute('class','Ticket transfer');
                }
                else{
                    oneflightsTicket.setAttribute('class','Ticket');
                }
                // Departure Information
        
                const DepartureContainer = document.createElement('div');
                DepartureContainer.setAttribute('class','DepartureContainer');
                
                const Departure = document.createElement('div');
                Departure.setAttribute('class','Departure');
                Departure.textContent = ticket.departure.airport;
                
                const TicketDepartureDate = ticket.departure.date.slice(0,10);
                const TicketDepartureTime = ticket.departure.date.slice(11);
                const Departure_Date = document.createElement('div');
                Departure_Date.setAttribute('class','Departure_Date');
                Departure_Date.textContent = TicketDepartureDate;

                const Departure_Time = document.createElement('div');
                Departure_Time.setAttribute('class','Departure_Time');
                Departure_Time.textContent = TicketDepartureTime;
                // Append Child To Container
                DepartureContainer.appendChild(Departure);
                DepartureContainer.appendChild(Departure_Date);
                DepartureContainer.appendChild(Departure_Time);

                // Arrival Information
                const ArrivalContainer = document.createElement('div');
                ArrivalContainer.setAttribute('class','ArrivalContainer');
                
                const Arrival = document.createElement('div');
                Arrival.setAttribute('class','Arrival');
                Arrival.textContent = ticket.arrival.airport;
                
                const TicketArrivalDate = ticket.arrival.date.slice(0,10);
                const TicketArrivalTime = ticket.arrival.date.slice(11);
                const Arrival_Date = document.createElement('div');
                Arrival_Date.setAttribute('class','Arrival_Date');
                Arrival_Date.textContent = TicketArrivalDate;

                const Arrival_Time = document.createElement('div');
                Arrival_Time.setAttribute('class','Arrival_Time');
                Arrival_Time.textContent = TicketArrivalTime;

                // Append Child To Container
                ArrivalContainer.appendChild(Arrival);
                ArrivalContainer.appendChild(Arrival_Date);
                ArrivalContainer.appendChild(Arrival_Time);
                
                // Operate Airline
                const OperatorContainer = document.createElement('div');
                OperatorContainer.setAttribute('class','OperatorContainer');

                const Operator = document.createElement('div');
                Operator.setAttribute('class','Operator');
                Operator.textContent = ticket.operator;

                const Flight_Number = document.createElement('div');
                Flight_Number.setAttribute('class','Flight_Number');
                Flight_Number.textContent = ticket.flightsnumber;

                //Append Child to Container
                OperatorContainer.appendChild(Operator);
                OperatorContainer.appendChild(Flight_Number);
                if(value === tickets.length-1){
                    const TicketPrice = document.createElement('div');
                    TicketPrice.setAttribute('class','Price');
                    TicketPrice.textContent = ticket.price + ' USD';
                    oneflightsTicket.appendChild(TicketPrice);

                }
    
                // Append Container to Ticket Element
                oneflightsTicket.appendChild(DepartureContainer);
                oneflightsTicket.appendChild(ArrivalContainer);
                oneflightsTicket.appendChild(OperatorContainer);
                flightTicket.appendChild(oneflightsTicket);
                const relativeFlightsid = ticket.relativeFlightsid;
                flightTicket.setAttribute('id',`relativeflight_${relativeFlightsid}`);

            });
            // Append Container to Mother Node
            PriceElement.appendChild(flightTicket);
        }
        flights.forEach((key)=>{       
                appendNode(key);
        })
    }

    // ShouldComponentUpdate  
    useEffect(()=>{
        const keys = Object.keys(test);
        keys.forEach((key)=>{
            const relativeFlightsid = test[key].relativeFlightsid;
            let copyArr = [];
            if(flights.get(relativeFlightsid) !== undefined){
                copyArr = [...flights.get(relativeFlightsid),test[key]];
            }
            else{
                copyArr = [test[key]];
            }
            flights.set(relativeFlightsid, copyArr);
        });
        displayTickets();
        console.log(flights.get(1));
    },[])
    return(
        <div id="Prices" onClick={(e) => {onClick(e,flights)}}>
            
        </div>
    )    
}

export default Price;



