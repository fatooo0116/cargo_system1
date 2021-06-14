import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Button 
        } from 'react-bootstrap';


// import  ModelPtypeCreate from './modal/ModelPtypeCreate';
// import  ModelPtypeEdit from './modal/ModelPtypeEdit';
// import { get_ptype, del_ptype } from './rest/func_restptype';
        


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



class PanelProductFix extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          checked:[],
          result:''
        }
    }

    componentDidMount() {


  
    }






    fixPrice = () =>{
     
      let me = this;
      axios.post('/wp-json/cargo/v1/product_fix_price')
      .then(function (res) {
          console.log(res);
          me.setState({result:res.data});
      })
      .catch(function (error) {
        console.log(error);
      });

    }







   /*  private function */
        removeByValue = (val, arr) =>{
          for( var i = 0; i < arr.length; i++){                                    
            if ( arr[i] == val) { 
                arr.splice(i, 1); 
                i--; 
            }
          }     
          return  arr;
        }
    




    render() {

        const {result} = this.state;


        const columns = [
          {
            cell: (cid) => <input
            type="checkbox"
            className="checkbox"
            checked={this.state.checked.includes(cid.id)}
            onChange={(e) => this.toggleRow(cid)}
          />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            name: '編號',
            selector: 'type_id',
            sortable: true,
          },
          {
            name: '名稱',
            selector: 'type_name',
            sortable: true,            
          },
          {
            name: '英文名稱',
            selector: 'type_eng_name',
            sortable: true,            
          },
          {
            name: '存貨科目',
            selector: 'stock_account',
            sortable: true,
            right: true,
          },
          {
            name: '進貨科目',
            selector: 'in_account',
            sortable: true,            
          },
          {
            name: '進貨退出',
            selector: 'out_account',
            sortable: true,           
          },     
          {
            cell: (pid) => <ModelPtypeEdit name="Edit"  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },     
        ];


        return (

            <Container id="aloha_app" >

                <Card>                 
                    <div className="card-body">
                    <h3>產品修正</h3>

                      <Button  onClick={this.fixPrice}>產品修正</Button>
                      
                      <div className="result" style={{padding:"20px 10px 10px"}}>
                        {JSON.stringify(result)}
                      </div>

                    </div> 
                </Card>


                     
            </Container>            
        )
    }
}

export default hot(module)(PanelProductFix);