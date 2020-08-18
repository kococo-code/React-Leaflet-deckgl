function handleAirport(target,data,setAirport,destroySearchBox){

    // Target = Departure : Arrival
    // => Onclick 
    const targetNode = target.parentNode;
    displaySearchBox(data);
    // Search Box Select Event
    function OnClick(e){
        const splitsTarget = e.target.className.split(' ');
        targetNode.childNodes.forEach((key)=>{
            if(key.className==="inputPlace"){
                key.value= splitsTarget[1];
            }
        })
        setAirport(splitsTarget[1]);
        destroySearchBox();
    }

    function displaySearchBox(data){
        // Destroy SearchBox before draw
        destroySearchBox();

        const SearchBox = document.createElement('div');
        SearchBox.setAttribute('id','SearchBox');
        SearchBox.addEventListener('click',OnClick);
        data.forEach((key,value)=>{
            const SearchAirportElement = document.createElement('div');
            SearchAirportElement.setAttribute('class',`SearchAirport ${key.iata}`);
            
            const AirportName = document.createElement('div');
            AirportName.setAttribute('class',`AirportName ${key.iata}`);
            AirportName.textContent = key.iata + ', ' + key.name + '  (' + key.country + ')';
            const AirportCodesWrapper = document.createElement('div');
            AirportCodesWrapper.setAttribute('class',`AirportCodesWrapper ${key.iata}`);
            const AirportIATA = document.createElement('div');
            AirportIATA.setAttribute('class',`AirportIATA ${key.iata}`);
            AirportIATA.textContent = key.iata;

            const AirportICAO = document.createElement('div');
            AirportICAO.setAttribute('class',`AirportICAO ${key.icao}`);
            AirportICAO.textContent = key.icao;

           // AirportCodesWrapper.appendChild(AirportIATA);
           // AirportCodesWrapper.appendChild(AirportICAO);
    
            SearchAirportElement.appendChild(AirportName);
           // SearchAirportElement.appendChild(AirportCodesWrapper);
            SearchBox.appendChild(SearchAirportElement);
            
        })
        targetNode.appendChild(SearchBox);
    }
    //`http://94rising.xyz/api/airport/getAirportName?target=${(target.value).toUpperCase()}`

}


export default handleAirport;