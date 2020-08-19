import React from 'react';
import './style/css/App.css';
import './style/css/MapComponent.css';
import './style/css/Prices.css';
import './style/css/Tickets.css';
import './style/css/Toggle.css';
import './style/css/Search.css';
import MapComponent from './component/map';
function App() {
  console.log(`
  ================================================================
|     __  ___   ______    _____    ______    _____    ______       |
|    |  |/  /  |  __  |  |   __|  |  __  |  |   __|  |  __  |      |
|    |  '  /   | |  | |  |  |     | |  | |  |  |     | |  | |      |
|    |  .  \\   | |__| |  |  |__   | |__| |  |  |__   | |__| |      |
|    |__|\\__\\  |______|  |_____|  |______|  |_____|  |______|      |
|                                                                  |                                              
|              kococo9504@naver.com, +82 10-4312-9504              |
  ================================================================ `)
  return (
    <div className="App">
      <div>
        <MapComponent></MapComponent>

      </div>
    </div>
  );
}

export default App;
