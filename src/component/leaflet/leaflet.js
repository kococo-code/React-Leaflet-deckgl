import React from 'react';
import L from 'leaflet';

export default class Leaflet extends React.Component{
    constructor(props){
        super(props)
        this.state={
              dark : {
                attr  : '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                url : 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
                },
              light :{
                url :  'https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png',
                attr : '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
              },
              centroid : [34.8419, 130.0315]
            }
    }
    initalizeMap(){
      this.map = L.map('map', {
        center: this.state.centroid,
        zoom: 7,
        layers: [
          L.tileLayer(this.state.dark.url, {
            attribution: this.state.dark.attr
          }),
        ]
      });
      this.layerGroup = L.layerGroup().addTo(this.map)
    }
    
    SetMarker(target){ 
     // L.marker([target.latitude,target.longtitude],{name:target.ICAO}).addTo(this.map);
      L.marker([target[0],target[1]]).addTo(this.layerGroup);
    }
    setFlytoCentroid(dataset){
        let x = 0.0;
        let y = 0.0;
        let z = 0.0;
        let depart_latitude = dataset.departure[0] *Math.PI / 180;
        let depart_longitude = dataset.departure[1] * Math.PI /180;
        let arrival_latitude = dataset.arrival[0] *Math.PI / 180;
        let arrival_longitude = dataset.arrival[1] * Math.PI /180;

        x += Math.cos(depart_latitude) * Math.cos(depart_longitude);
        y += Math.cos(depart_latitude) * Math.sin(depart_longitude);
        z += Math.sin(depart_latitude);
        x += Math.cos(arrival_latitude) * Math.cos(arrival_longitude);
        y += Math.cos(arrival_latitude) * Math.sin(arrival_longitude);
        z += Math.sin(arrival_latitude);

        let total = 2;
        x = x / total;
        y = y / total;
        z = z / total;

        let centralLongitude = Math.atan2(y, x);
        let centralSquareRoot = Math.sqrt(x * x + y * y);
        let centralLatitude = Math.atan2(z, centralSquareRoot);
        console.log([centralLatitude * 180 / Math.PI,centralLongitude * 180 / Math.PI])
        return [centralLatitude * 180 / Math.PI,centralLongitude * 180 / Math.PI]
     
       
      }
    setBounds(){
      
    }
    
    componentDidMount() {
        // create map
        this.initalizeMap();      
    }
    componentDidUpdate(){
      if(this.props.isDataPassed === true){
          this.layerGroup.clearLayers();
          this.SetMarker(this.props.data[0].departure)
          this.SetMarker(this.props.data[0].arrival)
          let flytoCenter = this.setFlytoCentroid(this.props.data[0]);
          
          //this.map.flyTo(flytoCenter,3)
          //this.SetMarker(flytoCenter)
          
        }      
        
   
    }

    render(){
        let style ={
            position : 'absolute',
            top :0,
            left :0,
            zIndex : 0,
            height : "100%",
            width : "100%"
        }
        return(
        <div id="map" style={style}></div>
        )
    }
}