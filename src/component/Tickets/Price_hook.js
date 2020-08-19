import React ,{useState,useEffect} from 'react';
import displayTickets from './displayTickets';
import axios from 'axios';
function Price(props){
    const destroyer = (delayTime) => setTimeout(()=>{
        document.getElementById("MapComponenet").removeChild(document.getElementById('loading'));
    },delayTime);
    // Ticket Price Request
    async function getData(departure,arrival,departureDate){
      
        //https://94rising.xyz/api/price/tickets?departure=${departure}&arrival=${arrival}&departure_date=${departureDate}
        await axios.get(`https://94rising.xyz/api/price/tickets?departure=${departure}&arrival=${arrival}&departure-date=${departureDate}`).then(
            req=>{
                console.log(req.status);
                if(req.status === 200){
                    setPrices(req.data);
                    // Store for Data
                    window.sessionStorage.setItem('tickets',JSON.stringify(req.data));
                    // Destory Loading Element
                    document.getElementById('loading').setAttribute('class','hidden');
                    const destroyloading = destroyer(1000);
                    clearTimeout(destroyloading);
                }else{
                    console.log("Not Found")
                    document.getElementsByClassName('locate')[0].textContent = 'Not Found!';
                    const destroyloading = destroyer(2000);
                    clearTimeout(destroyloading);
                }
          
                
            }).catch(
                err=>{
                    document.getElementsByClassName('waiting')[0].textContent = '';
                    document.getElementsByClassName('locate')[0].textContent = 'Not Found!';
                    const destroyloading = destroyer(2000);
                    clearTimeout(destroyloading);
                })
        

    }
  
    const [prices , setPrices] = useState(0);

    // Click Event for Tickets
    // Send Data to Map
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


    useEffect(()=>{
        const departure = props.searchTicket.departure;
        const arrival = props.searchTicket.arrival;
        const departureDate = props.searchTicket.departureDate;
        const setloading = () => {
            const loading = document.createElement('div');
            loading.setAttribute('id','loading');

            const wording = document.createElement('div');
            const wording2 = document.createElement('div');
            wording.setAttribute('class','locate');
            wording.textContent = `Fly! ${departure} to ${arrival}!`;
            wording2.setAttribute('class','waiting');
            wording2.textContent = 'Wait For Loading';
            loading.appendChild(wording);
            loading.appendChild(wording2);
            document.getElementById('MapComponenet').appendChild(loading);
        }

        // Control for empty Values
        // isChanged => Not Searched Just Toggle Switch Detect 
        if(departure !=='' && arrival !== '' && departureDate != '' && props.isChanged === true){
            getData(departure,arrival,departureDate);
            setloading();
        }else{
            // Restore Last Data 
            // When toggle Switched without Search 
            // This is Session Stroage ! Not LocalStorage
            if(window.sessionStorage.getItem('tickets') !== null){
                displayTickets(JSON.parse(window.sessionStorage.getItem('tickets')));
            }
        }

    },[])

    // After Prices Requests Detect Price State 
    useEffect(()=>{
            displayTickets(prices);
    },[prices])
    return(
        <div id="Prices" onClick={(e) => {onClick(e)}}>
      
        </div>
    )    
}

export default Price;



