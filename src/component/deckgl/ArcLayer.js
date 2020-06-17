import React from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {ArcLayer} from '@deck.gl/layers'
import Airport from '../../dataset/airportLocation.json';

const initialViewState = {
    longitude: 128.41669,
    latitude: 37.7853,
    zoom: 5,
    pitch: 0,
    bearing: 0
  };


export default class Deck extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          dataset : []
        };
    }  
    __renderLayer(){
      if(this.props.isDataPassed==true){
        let data = [{
          'sourcePosition' :[this.props.data.departure[1],this.props.data.departure[0]],
          'targetPosition' : [this.props.data.arrival[1],this.props.data.arrival[0]] }]
        console.log(data)
        const layers = [
          new ArcLayer({
              id: 'arc-layer',
              data: data,
              pickable: true,
              getWidth: 3,
              getSourcePosition: d => d.sourcePosition,
              getTargetPosition: d => d.targetPosition,
              getSourceColor: d => [124, 140, 0],
              getTargetColor: d => [255, 0, 0],
            })
        ];
        return layers
      }
    }
    
    
    componentDidUpdate(){
      if(this.props.isDataPassed==true){
          console.log('works');
          this.__renderLayer();
      }
    }
    render() {
      
      return (
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={this.__renderLayer()}>
          <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
      );
    }
  }