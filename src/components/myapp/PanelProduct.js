import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Button,
        Container,       
         Card
        } from 'react-bootstrap';


import  ModelProductCreate from './modal/ModelProductCreate';
import  ModelProductEdit from './modal/ModelProductEdit';
        
import { get_all_product, del_product } from './rest/func_rest_product';        

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



class PanelProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          is_reload:0,
          isLoading:0
        }
    }

    componentDidMount() {

      this.load_product();
    }


    load_product = () =>{
      let me = this;
      axios.post('/wp-json/cargo/v1/get_products', {
        page: 1,
        post_per_page: 99900
      })
      .then(function (res) {
        console.log(res);
        me.setState({data:res.data});
      })
      .catch(function (error) {
        console.log(error);
      });
    }


  
    handleAction = (data) =>{

      // this.setState({isLoading:1});
     
      console.log(data);
      console.log("...生成產品...");
      let me = this;
      axios.post('/wp-json/cargo/v1/bind_woo_products', {
        data: data,       
      })
      .then(function (res) {
        console.log(res);
        setTimeout(function(){
          me.load_product();
        },10);        

      });
      
    }




    


    fetch_all = () => {
      let me = this;
      get_all_ctype(function(resx){
        me.setState({
          data:resx
        });
      });
    }


    toggleRow = (cid) => {

      let all_checked = [];
      if(this.state.checked.includes(cid.id)){        
        all_checked = [...this.state.checked].filter(function(value){ 
          return value != cid.id;
         });
        
      }else{
        all_checked = [...this.state.checked,cid.id];
      };

      console.log( all_checked);
      this.setState({checked:all_checked});
    }




    deleteData = () =>{
      let checked = [...this.state.checked];
      if(window.confirm('確定刪除')){
        console.log(checked );
        let me = this;
        del_ptype(checked,function(obj){         
         
          get_all_Customer(function(resx){
            me.setState({data:resx});
          });
        });
      }
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

        const {data,isLoading} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        console.log(data);
        


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
            name: '產品編號',
            selector: 'product_id',
            sortable: true,
          },
          {
            name: '產品名',
            selector: 'product_name',
            sortable: true,            
          },
          {
            name: '產品明英文',
            selector: 'product_eng_name',
            sortable: true,            
          },
          {
            name: '產品類別',
            selector: 'type_name',
            sortable: true,
          },
          {
            name: '單位編號',
            selector: 'unit_sn',
            sortable: true,
            right: true,
          },
          {
            name: '計量編號',
            selector: 'unit_sn',
            sortable: true,            
          },
          {
            name: '計量編號',
            selector: 'unit_sn_cht',
            sortable: true,           
          },
          {
            name: 'CUFT',
            selector: 'cuft',           
          },
          {
            name: '包裝ㄧ',
            selector: 'out_pack',           
          },
          {
            name: '包裝二',
            selector: 'in_pack',           
          },
          {
            name: '淨重',
            selector: 'net_weight',           
          },
          {
            name: '總重',
            selector: 'gross_weight',           
          },
          {
            cell: (pid) => <ModelProductEdit name="Edit"  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          }
        ];


        return (

            <Container id="aloha_app" >
                <Card>
                    <div className="card-body">

                    <DataTable
                        title="產品"
                        columns={columns}
                        data={data}
                        pagination={true}                       
                    />

                    </div> 
                    </Card>
            </Container>            
        )
    }
}

export default hot(module)(PanelProduct);