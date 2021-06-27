import React from "react";
import { hot } from "react-hot-loader";

import {         
         Modal,
         Button
         
        } from 'react-bootstrap';
        
// import { XOctagonFill,CheckCircleFill } from 'react-bootstrap-icons';





        
class AlertBox extends React.Component{
    constructor(props) {
        super(props);

        this.state = {        
          
        }
    }    


    componentDidMount() {     

    }


    render(){
        const {
            is_Open,
            hideAlertModal,
            alert_status,
            name} = this.props;

            let title = '';
            if(alert_status==0){  /*  Error */
                title = <h4  color={{color:"#ff3434"}}>{name}</h4>;
            }else{ /*  Success */                
                title = <h4 color={{color:"#28a745"}} > {name}</h4>;
            }
      
 
        return (
            <Modal id="alert_modal" size="sm"  show={is_Open} onHide={hideAlertModal}>                     
                    <Modal.Body>            
                        {title}
                        
                        <Button variant="light"  onClick={hideAlertModal} size="sm" >確定</Button>                        
                    </Modal.Body>                  
          </Modal> 
        )
    }
}
export default hot(module)(AlertBox);