import React ,{useState} from 'react';
import Axios from 'axios';
import handleAirport from './InputBox/handleAirport';
import validationDateTime from './InputBox/validationDateTime';
import { set } from 'lodash';
export default function InputForm(props){
    const params  = {
        'SearchMinimumLetter' : 3,
        'AirportfilterCharset' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    const [departureAirport,setDepartureAirport] = useState('');
    const [arrivalAirport,setarrivalAirport] = useState('');
    const [departureDateTime , setDepartureDatetime] = useState('');
    const [arrivalDateTime , setArrivalDatetime] = useState('');

    function handleOnChange(e){
        // Validation Airport Name
        const datetimeFilter = ['departure date','arrival date'];
        const airportFilter = ['departure','arrival'];
        const targetName = e.target.name; // Component Type (Departure , Arrival , DepartureDatetime , ArrivalDateTime)
        
        // Airport Search Engine 
        if(airportFilter.indexOf(targetName) != -1){       
            function destroySearchBox(){
                // Search Box Destroyer 
                const element = document.getElementById('SearchBox');
                if(element !== null){
                    const parentNode = element.parentNode;
                    parentNode.removeChild(element);
                }
            }     
            // 
            if(e.target.value.length >= params.SearchMinimumLetter){
                /// Check ASCII
                let isinValid = false
                for(let i = 0 ; i < e.target.value.length ; i++){
                    if(params.AirportfilterCharset.indexOf(e.target.value[i].toUpperCase()) === -1){
                        return console.log('Invalid Type');
                    }
                }
                
                
                destroySearchBox();
                handleAirport(e.target,targetName === 'departure' ? setDepartureAirport : setarrivalAirport,destroySearchBox);
            } 
            else{
                destroySearchBox();
            }
        }
        // Validation Date
        else if(datetimeFilter.indexOf(targetName) != -1){
            if(e.target.value.length === 10){
                if(validationDateTime(e.target) === true){
                    const setTime = ()=>{
                        targetName === 'departure date' ? setDepartureDatetime(e.target.value) : setArrivalDatetime(e.target.value);
                    };
                    setTime();
                }
        }
        else{
            console.log("error");
            }
        }
    }
    function handleClick(){
        if(departureAirport !== '' && arrivalAirport !== ''){
            if(departureDateTime !== ''){
                if(arrivalAirport !== ''){
                    props.setCallback(departureAirport,arrivalAirport,departureDateTime,arrivalDateTime);
                }
            }else{
                props.setCallback(departureAirport,arrivalAirport,departureDateTime,arrivalDateTime);
            }
        }
        document.getElementById('Prices').setAttribute('class','hidden');

    };
    return (
        <div id="inputForm" onChangeCapture={handleOnChange}>
            <div className="inputBox departure" >
                <div className="inputBoxInfo">Departure</div>
                <input className="inputPlace" type="text" placeholder="Departure" name="departure" autoComplete="off"></input>
            </div>
            <div className="inputBox arrival">
                <div className="inputBoxInfo">Arrival</div>
                <input className="inputPlace" type="text" placeholder="Arrival" name="arrival"  autoComplete="off"></input>           
            </div>
            <div className="inputBox">
                <div className="inputBoxInfo">Departure Date</div>
                <input id="departureDate" className="inputPlace" type="date" placeholder={"2020-08-01"} name="departure date" autoComplete="off"></input>
            </div>
            <div className="inputBox">
                <div className="inputBoxInfo">Return Date</div>
                <input id="arrivalDate"className="inputPlace" type="date" placeholder="return date" autoComplete="off" disabled></input>
            </div>
            <button className="ClickButton" onClick={handleClick}>Search</button>
            
        </div>
    )
}