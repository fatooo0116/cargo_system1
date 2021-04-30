import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Button 
        } from 'react-bootstrap';


import  ModelPtypeCreate from './modal/ModelPtypeCreate';
import  ModelPtypeEdit from './modal/ModelPtypeEdit';
import { get_ptype, del_ptype } from './rest/func_restptype';
        


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



class PanelProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          checked:[]
        }
    }

    componentDidMount() {


      let me = this;
      get_ptype(function(data){
        me.setState({data:data});
      });
    }




    fetch_all = () => {
      let me = this;
      get_ptype(function(resx){
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
         
          get_ptype(function(resx){
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

                <div className="small_nav">
                    <ModelPtypeCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>


                <Card>
                    <div className="card-body">

                    <DataTable
                        title="產品類別"
                        columns={columns}
                        data={data}
                        pagination={true}
                    />

                    </div> 
                </Card>


                <div className="small_nav">
                  <ModelPtypeCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>                    
            </Container>            
        )
    }
}

export default hot(module)(PanelProductType);