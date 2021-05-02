import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';

// import {create_dep } from '../rest/func_restdep';

        

class AddrItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          fields: {},
          errors: {}
        }
    }

    render(){

        const {data} = this.props;
        console.log(data);

        return(
            <tr className="address_item">
                <td className="ad_w1">
                    <Button className="edit_btn" size="sm" variant="secondary" >編輯</Button> &nbsp;
                    <Button className="del_btn" variant="outline-danger" size="sm" >刪除</Button>
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