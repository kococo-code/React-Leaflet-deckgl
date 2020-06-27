import React from 'react';
import Deck from './deckgl/ArcLayer';
import Airport from './airportLocation.json';
import Leaflet from './leaflet/leaflet';
import Price from './common/Price_hook'
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            departure : '',
            arrival : '',
            departure_date : '',
            visibleInputBox : true,
            Airportlists : Object.keys(Airport),
            toggleState : 'on',
            inputBoxVisibility : true,
            isDataPassed : false,
            centroid : [34.8419, 130.0315],
            data : []
        }
        this.toggle.bind(this);
        this.handleClick.bind(this);
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
    handleClick = (event) =>{
        function AirportValidation(name){
            let airports = Object.keys(Airport)
            if(airports.indexOf(name) !== -1){
                return true
            }
            else{
                return false
            }
        }
        
        if(this.state.departure.length === 0 || this.state.arrival.length === 0) {
            alert(`Empty Input`) // Check Empty Length
        }
        else{
            if(this.state.isDataPassed === true){
                this.setState({
                    isDataPassed : false
                })
            }
            let d_validation = AirportValidation(this.state.departure)
            let a_validation = AirportValidation(this.state.arrival)
            
            //Check Validation Airport Code
            if(d_validation === true && a_validation === true){
                this.toggle();
                this.setState({
                    isDataPassed : true,
                })
            }
            else{
                // Will Be Push as Toast // 
                if(d_validation === true && a_validation === false){
                    alert(`${this.state.arrival} is Wrong`)
                }
                else if(d_validation === false && a_validation === true){
                    alert(`${this.state.departure} is Wrong`)
                }
                else{
                    alert(`${this.state.departure} and ${this.state.arrival} is Wrong`)
                }
            }   
        }
    }
    handleOnChange = (event) =>{
        this.setState({[event.target.name] : String(event.target.value).toUpperCase()});        
    }
    SelectedData =(childData)=>{
        let pushedData = []
        let flushData = []
        childData.map((key)=>
            pushedData.push({
                sourcePosition :[Airport[key.departure].longtitude,Airport[key.departure].latitude],
                targetPosition :[Airport[key.arrival].longtitude,Airport[key.arrival].latitude]})
        );
        this.setState({
            data : flushData.concat(pushedData)
        })
        console.log(this.state.data);
    }

    render(){
        let visibleStyle = {
            visibility : 'visible',
            opacity : 1,
            transition: 'visibility 0s linear 310ms, opacity 310ms'

        }
        let hiddenStyle ={
            visibility : 'hidden',
            opacity : 0,
            transition: 'visibility 0s linear 310ms, opacity 310ms'
        }        
        return(
            <div id="MapComponenet">
                <div className='visibleInputBox'></div>
                <div className={`switch ${this.state.toggleState}`} onClick={this.toggle} />
                <div id="inputForm" style={this.state.inputBoxVisibility ? visibleStyle : hiddenStyle}>
                        <div className="inputBox">
                            <div className="inputBoxInfo">Departure</div>
                            <input className="inputPlace" type="text" placeholder="Departure" name="departure" onChange={this.handleOnChange} autoComplete="off"></input>
                        </div>
                        <div className="inputBox">
                            <div className="inputBoxInfo">Arrival</div>
                            <input className="inputPlace" type="text" placeholder="Arrival" name="arrival" onChange={this.handleOnChange} autoComplete="off"></input>
                        </div>
                        <div className="inputBox">
                            <div className="inputBoxInfo">Departure Date</div>
                            <input className="inputPlace" type="date" placeholder="2020-08-01" name="departure_date" onChange={this.handleOnChange} autoComplete="off"></input>
                        </div>
                        <div className="inputBox">
                            <div className="inputBoxInfo">Return Date</div>
                            <input className="inputPlace" type="date" placeholder="Return Date" autoComplete="off" disabled></input>
                        </div>
                        <button className="ClickButton" onClick={this.handleClick}>Search</button>
                </div>
                
                <div>
                    <div>
                    </div>
                    <div className='isDataPassed'>
                        {this.state.isDataPassed ? <div>
                        {this.state.inputBoxVisibility?<div></div> : <Price child_callback={this.SelectedData} departure={this.state.departure} arrival={this.state.arrival} departure_date={this.state.departure_date}></Price>}
                        </div> : <div></div>}
                     </div>
                </div>
                <Deck isDataPassed={this.state.isDataPassed} data={this.state.data}></Deck>
            </div>
        )
    }
}