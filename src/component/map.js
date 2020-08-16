import React from 'react';
import Deck from './deckgl/ArcLayer';
import InputForm from './InputBox';
import FlightInformation from './common/flightInformation';
import Price from './common/Price_hook'
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            toggleState : 'off',
            departure : '',
            arrival : '',
            departureDate : '',
            arrivalDate : '',
            selectedData : '',
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
            'departure' : departure,
            'arrival' : arrival,
            'departureDate' : departureDate,
            'arrivalDate' : arrivalDate,
            'toggleState' : 'on'
        })
    }

    // Ticket Information Getting Handler 
    handleSelectedTicketsLocationValues = (tickets) =>{
        this.setState({
            selectedData : tickets
        })
        console.log(this.state.selectedData);
        
    }

    render(){
      
        return(
            <div id="MapComponenet">
                <div className={`map_switch ${this.state.toggleState}`} onClick={this.toggle} />
                {this.state.toggleState ==='off' ? <InputForm setCallback={this.handleInputBoxValues}></InputForm> : <div id="inputForm" className="hidden"></div> }
                {this.state.toggleState === 'on'? <Price departure={this.state.departure} arrival={this.state.arrival} departureDate={this.state.departureDate} selectedData={this.handleSelectedTicketsLocationValues}></Price> : <div id="Prices"></div>}
            </div>
        )
    }
}
//                <Deck isDataPassed={this.state.isDataPassed} data={this.state.data}></Deck>
