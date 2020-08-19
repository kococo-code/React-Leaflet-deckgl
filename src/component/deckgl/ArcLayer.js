import React,{Component} from 'react';
import DeckGL from '@deck.gl/react';
import {StaticMap} from 'react-map-gl';
import {ArcLayer} from '@deck.gl/layers'

export default class Deck extends Component {
      constructor(props){
        super(props);
        this.state = {
          'ViewState' : {
            longitude: 128.41669,
            latitude: 37.7853,
            zoom: 5,
            pitch: 0,
            bearing: 0
          }
        }
      }
    
    __renderLayer(){
      const data = this.props.data;
      const layers = [
          new ArcLayer({
              id: 'arc-layer',
              data: data,
              pickable: true,
              getWidth: 3,
              updateTriggers : {
                getSourcePosition: d => d.sourcePosition,
                getTargetPosition: d => d.targetPosition
              },
              getSourceColor: d => [124, 140, 0],
              getTargetColor: d => [255, 0, 0],
              wrapLongitude: true
            })
        ];
        return layers
    
    }
       
    render(){
      return (
          <DeckGL
            initialViewState={this.state.ViewState}
            controller={true}
            layers={this.__renderLayer()}>
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
          </DeckGL>
        );
    }
  }