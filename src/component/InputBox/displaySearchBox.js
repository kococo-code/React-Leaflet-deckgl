export default function displaySearchBox(data){
    // Destroy SearchBox before draw

    const SearchBox = document.createElement('div');
    SearchBox.setAttribute('id','SearchBox');
    SearchBox.addEventListener('click',OnClick);
    data.forEach((key,value)=>{
        const SearchAirportElement = document.createElement('div');
        SearchAirportElement.setAttribute('class',`SearchAirport ${key.iata}`);
        
        const AirportName = document.createElement('div');
        AirportName.setAttribute('class',`AirportName ${key.iata}`);
        AirportName.textContent = key.name + '  (' + key.country + ')';
        const AirportCodesWrapper = document.createElement('div');
        AirportCodesWrapper.setAttribute('class',`AirportCodesWrapper ${key.iata}`);
        const AirportIATA = document.createElement('div');
        AirportIATA.setAttribute('class',`AirportIATA ${key.iata}`);
        AirportIATA.textContent = key.iata;

        const AirportICAO = document.createElement('div');
        AirportICAO.setAttribute('class',`AirportICAO ${key.icao}`);
        AirportICAO.textContent = key.icao;

        AirportCodesWrapper.appendChild(AirportIATA);
        AirportCodesWrapper.appendChild(AirportICAO);
        
        
        SearchAirportElement.appendChild(AirportName);
        SearchAirportElement.appendChild(AirportCodesWrapper);
        SearchBox.appendChild(SearchAirportElement);

    })
    targetNode.appendChild(SearchBox);
}