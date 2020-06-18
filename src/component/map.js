import React from 'react';
import '../css/MapComponent.css';
import '../css/Toggle.css';
import RouteInfo from './common/RouteInformation';
import Deck from './deckgl/ArcLayer';
import Airport from '../dataset/airportLocation.json';
import Leaflet from './leaflet/leaflet';
import BestPrice from './common/bestPrice';
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            departure : '',
            arrival : '',
            visibleInputBox : true,
            Airportlists : Object.keys(Airport),
            toggleState : 'on',
            inputBoxVisibility : true,
            dataset : [
                {
                    'departure' : [0,0],
                    'arrival' : [0,0],
                    'name' : [0,0]
                }
            ],
            isDataPassed : false,
            centroid : [34.8419, 130.0315]
        }
        this.toggle.bind(this);
        this.handleClick.bind(this);
    }
    toggle = () =>{
        if(this.state.toggleState=='off'){
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
            if(airports.indexOf(name) !=-1){
                return true
            }
            else{
                return false
            }
        }
        
        if(this.state.departure.length == 0 || this.state.arrival.length == 0) {
            alert(`Empty Input`) // Check Empty Length
        }
        else{
            let d_validation = AirportValidation(this.state.departure)
            let a_validation = AirportValidation(this.state.arrival)
            
            //Check Validation Airport Code
            if(d_validation == true && a_validation == true){
                this.toggle();
                let data = [{
                    departure : [Airport[this.state.departure].latitude, Airport[this.state.departure].longtitude],
                    arrival : [Airport[this.state.arrival].latitude, Airport[this.state.arrival].longtitude],
                    name : [this.state.departure,this.state.arrival]
                }] 
                let flushArray = []
                this.setState({
                    isDataPassed : true,
                    dataset : flushArray.concat(data)
                })
            }
            else{
                // Will Be Push as Toast // 
                if(d_validation == true && a_validation == false){
                    alert(`${this.state.arrival} is Wrong`)
                }
                else if(d_validation == false && a_validation == true){
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
    distance() {
        if(this.state.isDataPassed == true){
            let lat1 = this.state.dataset[0].departure[0]
            let lat2 = this.state.dataset[0].arrival[0]
            let lon1 = this.state.dataset[0].departure[1]
            let lon2 = this.state.dataset[0].arrival[1]
            let unit = 'K'
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1/180;
                var radlat2 = Math.PI * lat2/180;
                var theta = lon1-lon2;
                var radtheta = Math.PI * theta/180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180/Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit=="K") { dist = dist * 1.609344 }
                if (unit=="N") { dist = dist * 0.8684 }
                let centroid = [Math.ceil((lat1+lat2)/2),Math.ceil((lat1+lat2)/2)]
                this.setState({
                    centroid : centroid
                })

                return Math.ceil(dist);
            }
        }
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
                            <input className="inputPlace" type="date" placeholder="Departure Date" autoComplete="off"></input>
                        </div>
                        <div className="inputBox">
                            <div className="inputBoxInfo">Return Date</div>
                            <input className="inputPlace" type="date" placeholder="Return Date" autoComplete="off"></input>
                        </div>
                        <button className="ClickButton" onClick={this.handleClick}>Search</button>
                </div>
                <div style={this.state.inputBoxVisibility ? hiddenStyle : visibleStyle}>
                    <div className="RouteInformation" style={this.state.isDataPassed ? visibleStyle : hiddenStyle}>
                        <RouteInfo isDataPassed={this.state.isDataPassed} data={this.state.dataset}></RouteInfo>
                    </div>
                </div>
                <div>
                    {this.state.isDataPassed ? <BestPrice departure={this.state.departure} arrival={this.state.arrival} isDataPassed={this.state.isDataPassed}></BestPrice> :
                    <div></div>}
                </div>
                <Deck data={this.state.dataset[0]} isDataPassed={this.state.isDataPassed}></Deck>
            </div>
        )
    }
}