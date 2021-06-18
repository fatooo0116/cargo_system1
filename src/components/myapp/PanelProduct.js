import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Button,
        Container,       
         Card,TextField
        } from 'react-bootstrap';


import  ModelProductCreate from './modal/ModelProductCreate';
import  ModelProductEdit from './modal/ModelProductEdit';
        
import { get_all_product, del_product,get_product_type } from './rest/func_rest_product';        

import DataTable, { createTheme } from 'react-data-table-component';



const FilterComponent = ({ filterText, onFilter, onClear }) => (
  <>
    <input id="search" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <Button type="button" onClick={onClear}>X</Button>
  </>
);



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
          ori:[],
          checked:[],
          ptype:[],
          is_reload:0,
          isLoading:0,
          filterText:'',
          toggledClearRows: false
        }
    }


    componentDidMount() {

      let me = this;
      get_all_product(function(data){
          me.setState({
            data:data,
            ori:data
          }); 
      });


    
      get_product_type(function(data){
          me.setState({
            ptype:data,            
          }); 
      });      
    }





    /*   綁定 Woo Product [begin]  */
    handleAction = (data) =>{          
      let me = this;
      axios.post('/wp-json/cargo/v1/bind_woo_prod_by_page', {
        checked:this.state.checked,
      })
      .then(function (res) {
        console.log(res);
        get_all_product(function(data){
          me.setState({
            data:data,
            ori:data,
            checked:[]
          }); 
        });
      });      
    }
  /*   綁定 Woo Product [end]  */




    

    
    fetch_all = () => {
      let me = this;
      /*
      get_all_product(function(resx){
        me.setState({          
          data:resx,
          ori:resx,
        });
      });
      */
    }
    







    deleteData = () =>{
      let checked = [...this.state.checked];
      if(window.confirm('確定刪除')){
        console.log(checked );
        let me = this;
        del_product(checked,function(obj){         
         
          get_all_product(function(resx){
            me.setState({
              data:resx,
              checked:[],
             toggledClearRows: true,
             filterText:''
            });

            console.log(me.state);
           // me.handleClearRows();
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







        getSubHeaderComponent = () => {
          let me =this;
          return (
            <FilterComponent

              onFilter={(e) => {
                let newFilterText = e.target.value;
                console.log(newFilterText);                
                let ori_data = [...me.state.ori];
              //  console.log(ori_data);

             
                let filteredItems = ori_data.filter(
                    (item) => item.product_name && item.product_name.includes(newFilterText) | item.product_id.includes(newFilterText)                    
                  );
           
                
               console.log(filteredItems);
                
                me.setState({ 
                  data:filteredItems,
                  filterText: newFilterText 
                });
              }}
              onClear={this.handleClear}
              filterText={this.state.filterText}
            />
          );
        };


        handleClear = () => {
            let ori = [...this.state.ori]; 
            this.setState({
              data:ori,
              filterText: ""
            });
        };


      handleChange = (state) => {
          
          this.setState({checked:state.selectedRows})
        };


        
      handleClearRows = () => {
       
          this.setState({ toggledClearRows: !this.state.toggledClearRows})
        }
      






    render() {

        const {data,checked,ptype} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

         console.log(data);
        
        let me = this;

        const columns = [
          {
            cell: (pid) => <ModelProductEdit name="Edit"  ptype={ptype}  pdata={pid}  fetch_all={me.fetch_all}   />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '50px' 
          },
          
          {
            name: '編號',
            selector: 'product_id',
            sortable: true,
            
          },

          {
            name: '名稱',
            selector: 'product_name',
            sortable: true,   
            grow:3,   
            cell: (pid) => (pid.woo_id > 0)? <a href={"/wp-admin/post.php?post="+pid.woo_id+"&action=edit"}  target="_blank"  >{pid.product_name}</a> : pid.product_name , 
          },
          {
            name: '英文名稱',
            selector: 'product_eng_name',
            sortable: true,            
          },
          {
            name: '產品類別',
            selector: 'cat',
            sortable: true,
            width: '250px',
            cell: (pid) => (pid.cat)? <span className="small_font">{pid.cat}</span> : '' ,
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
        ];


        return (
            <Container id="aloha_app" >

                <div className="small_nav">
                    <ModelProductCreate name="新增資料"   fetch_all={this.fetch_all }  ptype={ptype}   fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <><Button onClick={this.deleteData} > 刪除  {this.state.checked.length} </Button>  </>:''}
                    &nbsp; {( checked.length >0 )? <Button onClick={this.handleAction}>Binding Woo</Button> : ''}
                </div>

                <Card>
                    <div className="card-body">

                    <DataTable
                        title="產品"
                        columns={columns}
                        data={data}
                        pagination={true}   
                        subHeader
                        selectableRows={true}
                        selectableRowsVisibleOnly={true}
                        onSelectedRowsChange={this.handleChange}
                        clearSelectedRows={this.state.toggledClearRows}
                        subHeaderComponent={this.getSubHeaderComponent()}  
                        paginationPerPage="100"
                        paginationRowsPerPageOptions={["30","50","100"]}              
                    />

                    </div> 
                    </Card>

                    <div className="small_nav">
                    <ModelProductCreate name="新增資料"   fetch_all={this.fetch_all }  ptype={ptype} />  
                    {( checked.length >0 )? <><Button onClick={this.deleteData} > 刪除  {this.state.checked.length} </Button>  </>:''}
                    &nbsp; <Button onClick={this.handleAction}>Binding Woo</Button>
                </div>
            </Container>            
        )
    }
}

export default hot(module)(PanelProduct);