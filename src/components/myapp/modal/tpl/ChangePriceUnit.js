import React from "react";
import { hot } from "react-hot-loader";
import { 
    Button   
   } from 'react-bootstrap';

   
import {get_customer_price,update_price} from '../../rest/func_rest_price';

class ChangePriceUnit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
            is_ready:0,        
            default_price:0,
            price:0
        }
    }


    
    componentDidMount(){   
        const {pid,cid} = this.props;  
        let me = this;
        
        this.timerID = setTimeout(
            function(){

                get_customer_price({
                    pid:pid.id,
                    cid:cid.id
                },function(data){
                    if(data==0){
                        me.setState({
                            is_ready:1,                    
                         })                
                    }else{
                        me.setState({
                            is_ready:1,
                            default_price:data[0].price
                         }); 
                    }         
                });

            },
            500
          );

    }



    componentWillUnmount(){
        clearInterval(this.timerID);
    }
 

    update_price = () =>{
        const {price} = this.state;
        const {pid,cid} = this.props;
        let me = this;

        me.setState({
            is_ready:0,             
         }) 

        update_price(
            {
                price:price,
                cid:cid.id,
                woo_cid:cid.woo_id,
                woo_pid:pid.woo_id,
                pid:pid.id,                     
            },function(data){
                
            console.log(data);
            
            if(data){
                me.setState({
                    is_ready:1, 
                    default_price:data            
                 })  
            }

             
        }); 
    }



    render(){

        const {default_price,is_ready} = this.state;
        // console.log(pid);

        console.log(is_ready);

        return(
            
                <div className="table_column">
                    <div className="cur_price">目前價格 <b>{default_price}</b></div>
                    {(is_ready)?
                    <input type="number"   onChange={(e) => this.setState({ price:e.target.value }) } />
                    : <div className="my_loading"></div>}
                    <Button size="sm"  onClick={this.update_price} >Save</Button>
                </div>
        )    
    }   
}


export default hot(module)(ChangePriceUnit);