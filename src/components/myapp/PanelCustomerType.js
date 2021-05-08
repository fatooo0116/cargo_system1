import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,Button
        } from 'react-bootstrap';


import  ModelCtypeCreate from './modal/ModelCtypeCreate';
import  ModelCtypeEdit from './modal/ModelCtypeEdit';
        
        


import DataTable, { createTheme } from 'react-data-table-component';
import { get_all_ctype, del_ctype } from './rest/func_restctype';


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


class PanelCustomerType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          checked:[],
          toggledClearRows: false
        }
    }

    componentDidMount() {

      

      let me = this;
      get_all_ctype(function(resx){
        me.setState({data:resx});
      });      
    }








    deleteData = () =>{
        let checked = [...this.state.checked];
        if(window.confirm('確定刪除')){
          console.log(checked );
          let me = this;
          del_ctype(checked,function(obj){         
           
            get_all_ctype(function(resx){
              me.setState({data:resx});
            });
          });
        }
    }



    fetch_all = () => {
      let me = this;
      get_all_ctype(function(resx){
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











    handleChange = (state) => {
      // You can use setState or dispatch with something like Redux so we can use the retrieved data
      this.setState({checked:state.selectedRows})
    };

    handleClearRows = () => {
      this.setState({ toggledClearRows: !this.state.toggledClearRows})
    }
  




    render() {

      const {data,checked} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        console.log(data);

        const columns = [
          {
            cell: (pid) => <ModelCtypeEdit name="Edit"  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },          
          {
            name: '類別編號',
            selector: 'customer_catgory_id',
            sortable: true,
          },
          {
            name: '類別名稱',
            selector: 'customer_catgory_name',
            sortable: true,            
          },

          {
            name: '類別英文名稱',
            selector: 'customer_catgory_eng_name',
            sortable: true,            
          },

          {
            name: '其他',
            selector: 'other',
            sortable: true,            
          },
        ];


        return (

            <Container id="aloha_app" >

                <div className="small_nav">
                      <ModelCtypeCreate name="Add"    fetch_all={this.fetch_all} />  
                        {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>

                <Card>
                    <div className="card-body">

                    <DataTable
                        title="客戶類別"
                        columns={columns}
                        data={data}
                        pagination={true}
                        paginationPerPage="100"
                        paginationRowsPerPageOptions={["30","50","100"]}   
                        selectableRows={true}
                        selectableRowsVisibleOnly={true}
                        onSelectedRowsChange={this.handleChange}
                        clearSelectedRows={this.toggledClearRows}                           
                    />

                    </div> 
                    </Card>

                  <div className="small_nav">
                      <ModelCtypeCreate name="Add"    fetch_all={this.fetch_all} />  
                        {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                  </div>

            </Container>            
        )
    }
}

export default hot(module)(PanelCustomerType);