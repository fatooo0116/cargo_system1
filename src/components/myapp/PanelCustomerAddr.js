import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Button
        } from 'react-bootstrap';


import DataTable, { createTheme } from 'react-data-table-component';


import  ModelAddrCreate from './modal/ModelAddrCreate';
import  ModelAddrEdit from './modal/ModelAddrEdit';
import { get_all_addr, del_addr } from './rest/func_restaddr';
     

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


class PanelCustomerAddr extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          checked:[]
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/get_customers_addr', {
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









    toggleRow = (cid) => {
      
      // console.log(cid);

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
          del_addr(checked,function(obj){         
           
            get_all_addr(function(resx){
              me.setState({data:resx});
            });
          });
        }
    }



    fetch_all = () => {
      let me = this;
      get_all_addr(function(resx){
        me.setState({
          data:resx
        });
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

        const {data,checked} = this.state;
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
            name: '客戶編號',
            selector: 'customer_id',
            sortable: true,
          },
          {
            name: '客戶地址',
            selector: 'address_text',
            sortable: true,            
          },
          {
            name: '郵遞區號',
            selector: 'zip',
            sortable: true,            
          },
          {
            name: '聯絡人',
            selector: 'contact',
            sortable: true,            
          },
          {
            name: '聯絡人電話',
            selector: 'contact_phone',
            sortable: true,            
          },
          {
            name: '聯絡人傳真',
            selector: 'contact_fax',
            sortable: true,            
          },
          {
            cell: (pid) => <ModelAddrEdit name="Edit"  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ];






        return (

            <Container id="aloha_app" >

                <div className="small_nav">
                    <ModelAddrCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>

                <Card>
                    <div className="card-body">

                    <DataTable
                        title="客戶地址"
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

export default hot(module)(PanelCustomerAddr);