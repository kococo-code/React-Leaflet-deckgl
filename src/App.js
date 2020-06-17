import React from 'react';
import './App.css';
import MapComponent from './component/map';
import Leaflet from './component/leaflet/leaflet'
function App() {
  return (
    <div className="App">
      <div>
        <MapComponent></MapComponent>
      </div>
    </div>
  );
}

export default App;
