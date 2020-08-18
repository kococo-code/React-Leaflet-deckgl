import React ,{useState, useCallback, useEffect} from 'react';
import Axios from 'axios';
import handleAirport from './InputBox/handleAirport';
import requestSearchData from './InputBox/requestSearchData';
import validationDateTime from './InputBox/validationDateTime';
import {debounce} from 'lodash';
export default function InputForm(props){
    const params  = {
        'SearchMinimumLetter' : 3,
        'AirportfilterCharset' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    }
    const [departureAirport,setDepartureAirport] = useState('');
    const [arrivalAirport,setarrivalAirport] = useState('');
    const [departureDateTime , setDepartureDatetime] = useState('');
    const [arrivalDateTime , setArrivalDatetime] = useState('');
    const [currentEvent, setcurrentEvent] = useState();

    function handleOnChange(event){
        event.persist();
        // Validation Airport Name
        const datetimeFilter = ['departure date','arrival date'];
        const airportFilter = ['departure','arrival'];
        // Component Type (Departure , Arrival , DepartureDatetime , ArrivalDateTime)
        const targetName = event.target.name; 

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
            if(event.target.value.length >= params.SearchMinimumLetter){               
                for(let i = 0 ; i < event.target.value.length ; i++){
                    if(event.target.value[i] != String.fromCharCode(32)){
                        if(params.AirportfilterCharset.indexOf(event.target.value[i].toUpperCase()) === -1){
                            return console.log('Invalid Type');   
                        }
                    }
                }
                destroySearchBox();
                
                const debouncedfn= debounce(()=>{
                        let searchTarget = event.target;
                        requestSearchData(searchTarget,targetName === 'departure' ? setDepartureAirport : setarrivalAirport,destroySearchBox);
                },1000).bind();
                
                debouncedfn();
                
            } 
            else{
                destroySearchBox();
            }
        }
        // Validation Date
        else if(datetimeFilter.indexOf(targetName) != -1){
            if(event.target.value.length === 10){
                if(validationDateTime(event.target) === true){
                    const setTime = ()=>{
                        targetName === 'departure date' ? setDepartureDatetime(event.target.value) : setArrivalDatetime(event.target.value);
                    };
                    setTime();
                }
        }
        else{
            console.log("error");
            }
        }
        return 0;
    }
    function handleClick(){
        if(departureAirport !== '' && arrivalAirport !== ''){
            if(departureDateTime !== ''){
                if(arrivalDateTime !== ''){
                    props.setCallback(departureAirport,arrivalAirport,departureDateTime,arrivalDateTime);

                }else{
                    props.setCallback(departureAirport,arrivalAirport,departureDateTime,arrivalDateTime);
                }
            }else{
                alert('Not Enough Input !');
            }
        }
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
                <input id="departureDate" className="inputPlace" type="date" placeholder={"2020-08-20"} name="departure date" autoComplete="off"></input>
            </div>
            <div className="inputBox">
                <div className="inputBoxInfo">Return Date</div>
                <input id="arrivalDate"className="inputPlace" type="date" placeholder="return date" autoComplete="off" disabled></input>
            </div>
            <button className="ClickButton" onClick={handleClick}>Search</button>
            
        </div>
    )
}