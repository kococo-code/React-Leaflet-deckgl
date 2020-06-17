import React from 'react';

export default class RotueInfo extends React.Component{
    constructor(props){
        super(props)
    }
    distance(dataset) {
        if(this.props.isDataPassed == true){
            let lat1 = dataset[0].departure[0]
            let lat2 = dataset[0].arrival[0]
            let lon1 = dataset[0].departure[1]
            let lon2 = dataset[0].arrival[1]
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
                console.log(dist)
                return Math.ceil(dist)
            }
            
        }
    }
    render(){
        return(
            <div>
                    <div>Departure Airport : {this.props.data[0].name[0]}</div>
                    <div>Arrival Airport: {this.props.data[0].name[1]}</div>
                    <div>Distance : {this.distance(this.props.data)} Km</div>
            </div>
        )
    }
}