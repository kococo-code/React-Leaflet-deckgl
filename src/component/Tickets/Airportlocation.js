import axios from 'axios';


function getAirportInformation(departure,arrival,dataCallback){
    axios.get(`https://94rising.xyz/api/airport/flightsairport?departure=${departure}&arrival=${arrival}`).then(
        req=>{
            if(req.status === 200){
                dataCallback(req.data);
            }
        }).catch(
            error=>{
                console.log(error)
            }
        )
}
export default getAirportInformation;