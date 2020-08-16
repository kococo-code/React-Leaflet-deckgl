import React ,{useState,useEffect} from 'react';
import axios from 'axios';
function Price(props){
    
    // Ticket Price Request
    async function getData(departure,arrival,departureDate){
        let url = 'http://www.94rising.xyz/api/price/getPrice?departure=${departure}&arrival=${arrival}&departure_date=${departure_date}';
        let tmp = 'http://localhost:6060/api/price/getPrice?departure=${departure}&arrival=${arrival}&departure_date=${departure_date}'
        await axios.get(`http://localhost:6060/api/price/getPrice?departure=${departure}&arrival=${arrival}&departure_date=${departureDate}`).then(
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
    // Departure and Arrival Information 
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

    // Click Event for Tickets
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
        // Ticket Location Information
        props.selectedData(prices[relativeFlightIndex]);
    }
    
    // Ticket Information Document Writter 
    function displayTickets(){
        const PriceElement = document.getElementById('Prices');
        
        function appendNode(tickets){
            const flightTicket =  document.createElement('div');
            flightTicket.setAttribute('class','flightTicket');
            console.log(tickets);
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
                Departure.textContent = ticket.departure;
                
                const Departure_Date = document.createElement('div');
                Departure_Date.setAttribute('class','Departure_Date');
                Departure_Date.textContent = ticket.departure_date;

                const Departure_Time = document.createElement('div');
                Departure_Time.setAttribute('class','Departure_Time');
                Departure_Time.textContent = ticket.departure_time;
                // Append Child To Container
                DepartureContainer.appendChild(Departure);
                DepartureContainer.appendChild(Departure_Date);
                DepartureContainer.appendChild(Departure_Time);

                // Arrival Information
                const ArrivalContainer = document.createElement('div');
                ArrivalContainer.setAttribute('class','ArrivalContainer');
                
                const Arrival = document.createElement('div');
                Arrival.setAttribute('class','Arrival');
                Arrival.textContent = ticket.arrival;
                
                const Arrival_Date = document.createElement('div');
                Arrival_Date.setAttribute('class','Arrival_Date');
                Arrival_Date.textContent = ticket.arrival_date;
                console.log(ticket.arrival)
                const Arrival_Time = document.createElement('div');
                Arrival_Time.setAttribute('class','Arrival_Time');
                Arrival_Time.textContent =ticket.arrival_time;

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
                Flight_Number.textContent = ticket.flight_number;

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
                const relativeFlights = ticket.relativeFlights;
                flightTicket.setAttribute('id',`relativeflight_${relativeFlights}`);

            });
            // Append Container to Mother Node
            PriceElement.appendChild(flightTicket);
        }
        let pricesKeys = Object.keys(prices);
        pricesKeys.forEach((key)=>{       
                appendNode(prices[key]);
        })
    }

    // ShouldComponentUpdate  
    useEffect(()=>{

        // Control for empty Values 
        if(props.departure !=='' && props.arrival !== '' && props.departureDate != ''){
            getData(props.departure,props.arrival,props.departureDate);
        }
    },[])

    // After Prices Requests Detect Price State 
    useEffect(()=>{
        displayTickets();
    },[prices])
    return(
        <div id="Prices" onClick={(e) => {onClick(e)}}>
            
        </div>
    )    
}

export default Price;



