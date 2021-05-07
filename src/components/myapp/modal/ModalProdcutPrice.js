import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';

// import {create_dep } from '../rest/func_restdep';

import DataTable, { createTheme } from 'react-data-table-component';


createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });


        
class ModalProdcutPrice extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        
          products:[],
          fields: {},
          errors: {}
        }
    }    


    componentDidMount() {
        
    }
  





  
      handleSubmit = () =>{ 
  
      }   



    render(){
      //  const {is_Open} = this.state;
        const { products,
                is_Open,
                hidePriceModal,
                cur_price_modal_customer
             } = this.props;


             const columns = [
                {
                    name: '名稱',
                    selector: 'product_name',
                    sortable: true,  
                    width: '70%',                      
                    cell: (pid) => (pid.woo_id > 0)? <a href={"/wp-admin/post.php?post="+pid.woo_id+"&action=edit"}  target="_blank"  >{pid.product_name}</a> : pid.product_name , 
                  },
                {
                    cell: (pid) => <input type="text" />,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                   
                  },
                  {
                    cell: (pid) => <Button size="sm" >Save</Button>,
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    width: '120px' 
                  },
            ]


            // console.log(cur_price_modal_customer.id);

 
        return (
            <Modal id="price_modal" size="lg"  show={is_Open} onHide={hidePriceModal}>
            <form onSubmit={this.handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>{cur_price_modal_customer.cname} 價格設定</Modal.Title>
                    </Modal.Header>
            
                    <Modal.Body>            
                        <DataTable                          
                            columns={columns}
                            data={products}
                            pagination={true}   
                          //  subHeader
                          //  subHeaderComponent={this.getSubHeaderComponent()}                
                        />
                    </Modal.Body>
            
    
                    <Modal.Footer>
                        <Button variant="secondary" onClick={hidePriceModal}>關閉</Button>
                        <input variant="primary" className="btn btn-primary" type="submit" value="儲存送出" />
                    </Modal.Footer>
            </form>
          </Modal> 
        )
    }
}
export default hot(module)(ModalProdcutPrice);