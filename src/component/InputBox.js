import React ,{useState} from 'react';
import Axios from 'axios';
import handleAirport from './InputBox/handleAirport';
import validationDateTime from './InputBox/validationDateTime';
import { set } from 'd3';
export default function InputForm(props){
    const validCheck = {
        'departure_date' : false,
        'departure_airport' : false,
        'arrival_airport' : false
    }
    const params  = {
        'SearchMinimumLetter' : 3
    }
    const [departureAirport,setDepartureAirport] = useState('');
    const [arrivalAirport,setarrivalAirport] = useState('');
    const [departureDateTime , setDepartureDatetime] = useState();
    const [arrivalDateTime , setArrivalDatetime] = useState();

    function handleOnChange(e){
        // Validation Airport Name
        const datetimeFilter = ['departure date','arrival date'];
        const airportFilter = ['departure','arrival'];
        const targetName = e.target.name;
        if(airportFilter.indexOf(targetName) != -1){       
            function destroySearchBox(){
                const element = document.getElementById('SearchBox');
                if(element !== null){
                    const parentNode = element.parentNode;
                    parentNode.removeChild(element);
                }
            }     
            // Will be update for Search Airport

            if(e.target.value.length >= params.SearchMinimumLetter){
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
                        targetName === 'departure_datetime' ? setDepartureDatetime(e.target.value) : setArrivalDatetime(e.target.value);
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
                <input className="inputPlace" type="date" placeholder={"2020-08-01"} name="departure date" autoComplete="off"></input>
            </div>
            <div className="inputBox">
                <div className="inputBoxInfo">Return Date</div>
                <input className="inputPlace" type="date" placeholder="return date" autoComplete="off" disabled></input>
            </div>
            <button className="ClickButton" onClick={handleClick}>Search</button>
            
        </div>
    )
}