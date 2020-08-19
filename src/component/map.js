import React from 'react';
import Deck from './deckgl/ArcLayer';
import InputForm from './InputBox';
import getAirportInformation from './Tickets/Airportlocation';
import Price from './Tickets/Price_hook'

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
            toggleState : 'on',
            searchTicket : new Flight(),
            selectedData : '',
            // Detect Search Variable Changed
            changed : false
        }
    }
    // Toggle Handler
    toggle = () =>{
        this.setState({
            'changed' : false
        })
        const loadingElement = document.getElementById('loading');
        if(loadingElement !== null){
            document.getElementById('loading').parentNode.removeChild(loadingElement);
        }
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
        console.log(departure, arrival ,departureDate, arrivalDate);
        this.setState({
            'searchTicket' : {
                'departure' : departure,
                'arrival' : arrival,
                'departureDate' : departureDate,
                'arrivalDate' : arrivalDate
            },
            'toggleState' : 'off',
            'changed' : true
        })
    }

    // Ticket Information Getting Handler 
    handleSelectedTicketsLocationValues = (tickets) =>{
        this.setState({
            selectedData : [] // Flush
        })
        let data = tickets;
        if(data!== undefined){
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
        }
    }

    render(){
      
        return(
            <div id="MapComponenet">
                <div className={`map_switch ${this.state.toggleState}`} onClick={this.toggle} />
                {this.state.toggleState ==='on' ? <InputForm setCallback={this.handleInputBoxValues}></InputForm> : <div id="inputForm" className="hidden"></div> }
                {this.state.toggleState === 'off'? <Price searchTicket={this.state.searchTicket} selectedData={this.handleSelectedTicketsLocationValues} isChanged={this.state.changed}></Price> : <div id="Prices" className="hidden"></div>}
                <Deck data={this.state.selectedData}></Deck>

            </div>
        )
    }
}
//                <Deck data={this.state.selectedData}></Deck>
