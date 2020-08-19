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
    const [searchData,setSearchData] = useState({
        'departure' : '',
        'arrival' : '',
        'departureDate' : '',
        'arrivalDate' : ''
    })
    const [departureAirport,setDepartureAirport] = useState('');
    const [arrivalAirport,setarrivalAirport] = useState('');
    const [departureDateTime , setDepartureDatetime] = useState('');
    const [arrivalDateTime , setArrivalDatetime] = useState('');
    
    const [userQuery,setUserQuery] = useState('');
    const [targetQuery ,setTargetQuery] = useState('');
    // loadsh Debounce in React Functional Componenet
    // using useCallback and useEffect detect userQuery and DelayedQuery
    // https://dev.to/reflexgravity/use-lodash-debouce-inside-a-functional-component-in-react-4g5j
    const updateQuery = () =>{
        handleOnChange2()
    }
    const delayedQuery = useCallback(debounce(updateQuery, 500), [userQuery]);
    const onChange = e => {
        setUserQuery(e.target.value);
        setTargetQuery(e.target.id);
     };
     
    useEffect(() => {
        delayedQuery();
     
        // Cancel the debounce on useEffect cleanup.
        return delayedQuery.cancel;
     }, [userQuery, delayedQuery]);



    function handleOnChange2(){
        // Validation Airport Name
        const datetimeFilter = ['departureDate','arrivalDate'];
        const airportFilter = ['departureInput','arrivalInput'];
        // Component Type (Departure , Arrival , DepartureDatetime , ArrivalDateTime)
        const targetName = targetQuery; 
        const targetValue = userQuery;
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
            if(targetValue.length >= params.SearchMinimumLetter){    
                for(let i = 0 ; i < targetValue.length ; i++){
                    if(targetValue[i] != String.fromCharCode(32)){
                        if(params.AirportfilterCharset.indexOf(targetValue[i].toUpperCase()) === -1){
                            return console.log('Invalid Type');   
                        }
                    }
                }
                destroySearchBox();
                requestSearchData(targetName,targetValue,targetName === 'departureInput' ? setDepartureAirport : setarrivalAirport,destroySearchBox);

            
                
            } 
            else{
                destroySearchBox();
            }
        }
        // Validation Date
        else if(datetimeFilter.indexOf(targetName) != -1){
            if(targetValue.length === 10){
                const setTime = (dateTimeValue)=>{
                    targetName === 'departureDate' ? setDepartureDatetime(dateTimeValue) : setArrivalDatetime(dateTimeValue);
                };
                if(validationDateTime(targetValue) === true){
                    setTime(targetValue);
                }else{
                    document.getElementById(targetName).value = '';
                    setTime('')
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
        }else{
            alert('Not Enough Input !');
        }
    
        
    };
    

    return (
        <div id="inputForm" onChangeCapture={onChange}>
            <div className="inputBox departure" >
                <div className="inputBoxInfo">Departure</div>
                <input id="departureInput" className="inputPlace" type="text" placeholder="Departure" name="departure" autoComplete="off"></input>
            </div>
            <div className="inputBox arrival">
                <div className="inputBoxInfo">Arrival</div>
                <input  id="arrivalInput" className="inputPlace" type="text" placeholder="Arrival" name="arrival"  autoComplete="off"></input>           
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