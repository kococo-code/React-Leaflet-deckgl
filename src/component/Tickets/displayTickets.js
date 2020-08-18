 // Ticket Information Document Writter 
function displayTickets(prices){
    const PriceElement = document.getElementById('Prices');
    PriceElement.setAttribute('class','');
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
            Departure.textContent = ticket.departure;
            
            const Departure_Date = document.createElement('div');
            Departure_Date.setAttribute('class','Departure_Date');
            Departure_Date.textContent = ticket.departure_date;

            const Departure_Time = document.createElement('div');
            Departure_Time.setAttribute('class','Departure_Time');
            Departure_Time.textContent = ticket.departure_time ;
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

            const Arrival_Time = document.createElement('div');
            Arrival_Time.setAttribute('class','Arrival_Time');
            Arrival_Time.textContent = ticket.arrival_time;

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

            // BookingLink and Price
            if(value === tickets.length-1){
                const bookinglink = document.createElement('a');
                bookinglink.setAttribute('href',ticket.bookinglink);
                bookinglink.setAttribute('target','_blank');
                bookinglink.setAttribute('class','link-btn');
                bookinglink.textContent = 'Link';
                const TicketPrice = document.createElement('div');
                TicketPrice.setAttribute('class','Price');
                TicketPrice.textContent = ticket.price + ' USD';
                oneflightsTicket.appendChild(TicketPrice);
                oneflightsTicket.appendChild(bookinglink);

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
export default displayTickets;