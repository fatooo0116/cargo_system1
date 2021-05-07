import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal,
         Form
        } from 'react-bootstrap';

// import {create_dep } from '../rest/func_restdep';
// import { del_addr} from '../../rest/func_restaddr';
        

class ProductTypeCheckBox extends React.Component {
    constructor(props) {
        super(props);

       
    }


    updatePType = (e) => {
      
        const key = e.target.value;

        console.log(key);

        let ptype_checked = [...this.props.ptype_checked];

        if(ptype_checked.includes(key)){
            const index = ptype_checked.indexOf(key);
            if (index > -1) {
                ptype_checked.splice(index, 1);
            }
        }else{
            ptype_checked.push(key);
        }
        console.log(ptype_checked);
        
        this.props.update_checked_ptype(ptype_checked);
       //  this.setState({ptype_checked:ptype_checked});
    }






    render(){

        const {ptype,ptype_checked} = this.props;
        // const {ptype_checked} = this.state;
        let tpl = [];
        let me = this;

        console.log(ptype);

        ptype.forEach(function(item){
                if(item.hasOwnProperty('children')){                   
                    tpl.push(<Form.Check type="checkbox" parent={item.parent} className="" id={"key"+item.term_id}   onChange={me.updatePType}  value={item.term_id}   checked={ptype_checked.includes(item.term_id.toString())}  label={item.term_name} /> );
                    item.children.forEach(function(child){
                        tpl.push(<div className="child_item"><Form.Check   type="checkbox" parent={child.parent} className="" id={"key"+child.term_id}   onChange={me.updatePType}  value={child.term_id}   checked={ptype_checked.includes(child.term_id.toString())}  label={child.term_name} /></div> );

                        if(child.hasOwnProperty('children')){ 
                            child.children.forEach(function(child1){
                                tpl.push(<div className="child_item2"><Form.Check   type="checkbox" parent={child1.parent} className="" id={"key"+child1.term_id}   onChange={me.updatePType}  value={child1.term_id}   checked={ptype_checked.includes(child1.term_id.toString())}  label={child1.term_name} /></div> );
                            });
                        }
                    });
                }else{
                    tpl.push(<Form.Check type="checkbox" parent={item.parent} className="" id={"key"+item.term_id}   onChange={me.updatePType}  value={item.term_id}   checked={ptype_checked.includes(item.term_id.toString())}  label={item.term_name} /> );
                }                                 
        });

        return (
                <div className="checkbox_outter" >
                    <Form.Group  controlId="formBasicCheckbox">
                        {tpl}
                    </Form.Group>                      
                </div>
        )
    }    
}


export default hot(module)(ProductTypeCheckBox);