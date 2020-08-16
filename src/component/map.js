import React from 'react';
import Deck from './deckgl/ArcLayer';
import InputForm from './InputBox';
import getAirportInformation from './common/Airportlocation';
import FlightInformation from './common/flightInformation';
import Price from './common/Price_hook'

function Flight(){
    Flight.prototype.departure = '';
    Flight.prototype.arrival = '';
    Flight.prototype.departureDate = '';
    Flight.prototype.arrivalDate = '';
}
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            toggleState : 'off',
            searchTicket : new Flight(),
            selectedData : '',
            changed : false
        }
    }
    // Toggle Handler
    toggle = () =>{
        if(this.state.toggleState ==='off'){
            this.setState({
                toggleState : 'on',
            })   
            document.getElementById('inputForm').setAttribute('class','hidden');
            document.getElementById('Prices').setAttribute('class','visible');
        }else{
            this.setState({
                toggleState : 'off',
            })
            document.getElementById('inputForm').setAttribute('class','visible');
            document.getElementById('Prices').setAttribute('class','hidden');
        }
    }
    // Input Box Value Handler
    handleInputBoxValues = (departure,arrival,departureDate,arrivalDate) =>{
        this.setState({
            'searchTicket' : {
                'departure' : departure,
                'arrival' : arrival,
                'departureDate' : departureDate,
                'arrivalDate' : arrivalDate
            },
            'toggleState' : 'on'
        })
    }

    // Ticket Information Getting Handler 
    handleSelectedTicketsLocationValues = (tickets) =>{
        this.setState({
            searchTicket : [] // Flush
        })
        let data = tickets;
        const keys = Object.keys(data);
        keys.forEach((key)=>{
            const dataCallback = (data) =>{
                const parsedData = {
                    'sourcePosition' : [data.departure[0].longitude,data.departure[0].latitude],
                    'targetPosition' : [data.arrival[0].longitude,data.arrival[0].latitude]
                }

                this.setState({
                    selectedData : [...this.state.selectedData, parsedData]
                })          
            }
            // Axios => Get Airport Information , callback is Set Cordination
            getAirportInformation(data[key].departure,data[key].arrival,dataCallback);
        })
        this.setState({
            changed : true
        })
    }

    render(){
      
        return(
            <div id="MapComponenet">
                <div className={`map_switch ${this.state.toggleState}`} onClick={this.toggle} />
                {this.state.toggleState ==='off' ? <InputForm setCallback={this.handleInputBoxValues}></InputForm> : <div id="inputForm" className="hidden"></div> }
                {this.state.toggleState === 'on'? <Price searchTicket={this.state.searchTicket} selectedData={this.handleSelectedTicketsLocationValues}></Price> : <div id="Prices"></div>}
                <Deck data={this.state.selectedData} changed={this.state.changed}></Deck>
            </div>
        )
    }
}
//                <Deck isDataPassed={this.state.isDataPassed} data={this.state.data}></Deck>
