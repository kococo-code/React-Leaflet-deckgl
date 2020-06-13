import React from 'react';
import L from 'leaflet';
import Airport from './airportLocation.json';
export default class MapComponent extends React.Component{
    constructor(props){
        super(props)
    }
    
    componentDidMount() {
        // create map
        let src = 'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png';
        let attribution =  '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';

        let airports = Object.keys(Airport);
        
        let CJU = [Airport.CJU.latitude,Airport.CJU.longtitude];
        let GMP = [Airport.GMP.latitude,Airport.GMP.longtitude];
        let ICN = [Airport.ICN.latitude,Airport.ICN.longtitude];

        let array = [CJU,ICN];
        //let length =airports.length;
        //for(let i = 0 ; i<length ; i++){
        //   array.push([Airport[airports[i]].latitude,Airport[airports[i]].longtitude,Airport[airports[i]].ICAO])
        // }
        
        console.log(array)
        this.map = L.map('map', {
          center: [34.8419, 130.0315],
          zoom: 7,
          layers: [
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
              attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }),
          ]
        });
        
        for(let i = 0 ; i < array.length ; i++){
            L.marker([array[i][0],array[i][1]]).addTo(this.map);
        }
        
    }

    render(){
        let style ={
            position : 'relative',
            height : 1024,
            width : 1920
        }
        return(
        <div id="map" style={style}></div>
        )
    }
}