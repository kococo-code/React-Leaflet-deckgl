import React from 'react';
import axios from 'axios';
import '../../css/Price.css';
export default class BestPrice extends React.Component{
    constructor(props){
        super(props)
        this.state={
            prices : [],
            isDatapassed : false,
        }
    }
    getPrice(){
        axios.get(`http://localhost:4000/api/price?departure=${this.props.departure}&arriaval=${this.props.arrival}`).then(
            req=>{
                if(Object.keys(req.data).length >0){
                    let flushArray = []
                    this.setState({
                        prices : flushArray.concat(req.data),
                        isDatapassed : true
                    })
                }
            }
        ).catch(
            err=>{
                console.log(err)
            }
        )
    }
    explainPrice(){
        if(this.state.isDatapassed == true){
            let keys = Object.keys(this.state.prices[0])
            let idx = 1
            let flights = keys.map((key)=>{
                let name = ''
                if (idx%2 == 0){
                    name = 'odd';
                }
                else{
                    name='even';
                }
                idx +=1;
                let _ = key
                let price = this.state.prices[0][_].price
                let departureTime = this.state.prices[0][_].outbound.departure
                let arrivalTime = this.state.prices[0][_].outbound.arrival
                let operator = this.state.prices[0][_].outbound.operator
                return (<div className='PriceComponenet' id={name}>
                    <span className="PriceComponent" id="inbox">{_.replace('_',' ')}</span>
                    <span className="PriceComponent" id="inbox">{operator}</span>
                    <span className="PriceComponent" id="inbox">{departureTime}</span>
                    <span className="PriceComponent" id="inbox">{arrivalTime}</span>
                    <span className="PriceComponent" id="inbox">{price}</span>

                    </div>)
            })
            return flights
        }
    
    }

    
    componentDidMount(){
        this.getPrice();
        this.explainPrice();
    }
    render(){
        
        return(
            <div>
                <div className="PricesContainer">
                    {this.explainPrice()}
                </div>
            </div>
        )
    }
}