import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';

// import {create_dep } from '../rest/func_restdep';
import { del_addr} from '../../rest/func_restaddr';
        

class AddrItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          checked:[]
        }
    }


    del_customer_addr = (pid) =>{

        let me =this;
        // alert(pid);
        del_addr(pid,function(data){
            me.props.reload();
        });
    }



    render(){

        const {data} = this.props;
        console.log(data);

        return(
            <tr className="address_item">
                <td className="ad_w1">
                    <Button className="edit_btn"  onClick={ () => this.props.edit_addr(data) }    size="sm" variant="secondary" >編輯</Button> &nbsp;
                    <Button className="del_btn"  onClick={()=> this.del_customer_addr(data.id) } variant="outline-danger" size="sm" >刪除</Button>
                </td>
                <td className="ad_w2">{data.zip}</td>
                <td className="ad_w3">{data.address_text}</td>
                <td className="ad_w4">{data.contact}</td>
                <td className="ad_w5">{data.contact_title}</td>
                <td className="ad_w6">{data.contact_phone}</td>
                <td className="ad_w7">{data.contact_fax}</td>
            </tr>
        )    
    }   
}


export default hot(module)(AddrItem);