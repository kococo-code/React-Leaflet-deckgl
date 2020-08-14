import React from 'react';
import Deck from './deckgl/ArcLayer';
import Airport from './airportLocation.json';
import Leaflet from './leaflet/leaflet';
import InputForm from './InputBox';
import FlightInformation from './common/flightInformation';
import Price from './common/Price_hook'
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            toggleState : 'off'
        }
    }
    toggle = () =>{
        if(this.state.toggleState ==='off'){
            this.setState({
                toggleState : 'on',
                inputBoxVisibility : true,
                
            })   
        }else{
            this.setState({
                toggleState : 'off',
                inputBoxVisibility : false,
            })
        }
    }
   
    

    render(){
      
        return(
            <div id="MapComponenet">
                <div className={`map_switch ${this.state.toggleState}`} onClick={this.toggle} />
                <InputForm></InputForm>
                <Price></Price>
                <FlightInformation></FlightInformation>
            </div>
        )
    }
}
//                <Deck isDataPassed={this.state.isDataPassed} data={this.state.data}></Deck>
