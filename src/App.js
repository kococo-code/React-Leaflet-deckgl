import React from 'react';
import './style/css/App.css';
import './style/css/MapComponent.css';
import './style/css/Flights.css';
import './style/css/Tickets.css';
import './style/css/Toggle.css';
import MapComponent from './component/map';
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
