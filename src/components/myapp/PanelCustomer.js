import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,  
         Button,
         Form,
         FormControl,
         Modal
        } from 'react-bootstrap';


        import  ModelCustomerCreate from './modal/ModelCustomerCreate';
        import  ModelCustomerEdit from './modal/ModelCustomerEdit';
        import  ModelCustomerAddr from './modal/ModelCustomerAddr';

        import { get_all_ctype } from './rest/func_restctype';

        /*  price setting */
        import ModalProdcutPrice from './modal/ModalProdcutPrice';

        
        import { get_all_customer, del_customer } from './rest/func_rest_customer';

        import { get_all_product} from './rest/func_rest_product';        
   


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


  /*
  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };
  */




class PanelCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          filterText:'',
          data: [],
          ori:[],
          products:[],
          checked:[],
          ctype:[],
          price_is_Open:false,
          cur_price_modal_customer:'',
          toggledClearRows: false
        }
    }



    componentDidMount() {
      let me = this;
      get_all_customer(function(data){
          me.setState({
            data:data,
            ori:data
          });         
      });

      get_all_product(function(products){
        me.setState({products:products}); 
      });

      get_all_ctype(function(data){      
          me.setState({
           ctype:data
          });
      });
    
    }




    getSubHeaderComponent = () => {
      let me =this;
      return (
        <FilterComponent

          onFilter={(e) => {
            let newFilterText = e.target.value;
            // console.log(newFilterText);                
            let ori_data = [...me.state.ori];
          //  console.log(ori_data);

         
            let filteredItems = ori_data.filter(
                (item) => item.cname && item.cname.includes(newFilterText) | item.customer_id.includes(newFilterText)                    
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






    fetch_all = () => {
      let me = this;
      get_all_customer(function(resx){
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
        del_customer(checked,function(obj){         
          // console.log(obj);

          get_all_customer(function(resx){
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




        openPriceModal = (pid) =>{
          this.setState({ 
            price_is_Open : true,
            cur_price_modal_customer:pid
          });
        }

  
        hidePriceModal = () =>{     
            this.setState({
              price_is_Open:false,
              cur_price_modal_customer:''
            });      
          }   


        handleClear = () => {            
          let ori = [...this.state.ori]; 
          this.setState({
            data:ori,
            filterText: ""
          });
        };


      handleChange = (state) => {
          // You can use setState or dispatch with something like Redux so we can use the retrieved data
          this.setState({checked:state.selectedRows})
      };

      handleClearRows = () => {
          this.setState({ toggledClearRows: !this.state.toggledClearRows})
        }


      /*  Binding Woocommerce  Customer  */
      handleBindWoo  = () =>{ 
        let me = this;
        axios.post('/wp-json/cargo/v1/bind_woo_customer_by_page', {
          checked:this.state.checked,
        })
        .then(function (res) {
          console.log(res);

          get_all_customer(function(data){
            
            me.setState({
              data:data,
              ori:data,
              checked:[],
              // toggledClearRows: true
            });    
            
            me.handleClearRows();
          });

        });   
      }







    render() {

        const {data,ctype,checked,products,price_is_Open,cur_price_modal_customer} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

       

        const columns = [

          {
            cell: (pid) => <ModelCustomerEdit name="編輯"  ctype={ctype}  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '50px' 
          },
          {
            cell: (pid) => <ModelCustomerAddr name="地址"   pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '50px' 
          },
          {
            cell: (pid) => <button  className="btn btm-default btn-outline-dark btn-sm"  pdata={pid}  onClick={() => this.openPriceModal(pid)}  >價格</button>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
            width: '50px' 
          },
          {
            name: '客戶編號',
            selector: 'customer_id',
            cell: (pid) => (pid.woo_id > 0)? <a href={"/wp-admin/user-edit.php?user_id="+pid.woo_id}  target="_blank"  >{pid.customer_id}</a> : pid.customer_id , 
            sortable: true,
          },


          {
            name: 'Woo_id',
            selector: 'woo_id',
            sortable: true,
            
          },

          {
            name: '帳款歸屬',
            selector: 'account_id',
            sortable: true,
          },

          {
            name: '名稱',           
            selector: 'cname',
            sortable: true,  
            width:'250px'          
          },
          {
            cell: (pid) => (pid.is_temp=='1')? '是':'否',
            name: '臨時客戶',           
            selector: 'is_temp',
            sortable: true,  
            width:'100px'            
          },
          {
            cell: (pid) =>  (pid.is_global=='1')? '是':'否' ,
            name: '外商',
            selector: 'is_global',
            sortable: true, 
            width:'80px'               
          },
          {
            name: '聯絡人',
            selector: 'contact',
            sortable: true,            
          },
          {
            name: '聯絡人職稱',
            selector: 'contact_job',
            sortable: true,
          },
          {
            name: '聯絡人電話1',
            selector: 'contact_tel1',   
            width:'180px'         
          },
          {
            name: '聯絡人電話2',
            selector: 'contact_tel2',
            width:'180px'
          },
          {
            name: '聯絡人電話3',
            selector: 'contact_tel3',
            width:'180px'
          },
          {
            name: '聯絡人手機',
            selector: 'contact_mobile',
            width:'180px'
          },
          {
            name: '聯絡人傳真',
            selector: 'contact_fax',
          },
          {
            name: '聯絡人Email',
            selector: 'contact_email',
          },



        ];

 







        return (

            <Container id="aloha_app" >

                <div className="small_nav">
                    <ModelCustomerCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} > 刪除  {this.state.checked.length} </Button>:''}                          
                    &nbsp; {( checked.length >0 )? <Button onClick={this.handleBindWoo}>Binding Woo</Button> : ''}
                </div>

                <Card>
                    <div className="card-body">
                      <DataTable
                          title="客戶"
                          columns={columns}
                          data={data}
                          pagination={true}
                          subHeader
                          subHeaderComponent={this.getSubHeaderComponent()} 
                          selectableRows={true}
                        selectableRowsVisibleOnly={true}
                        onSelectedRowsChange={this.handleChange}
                       
                        clearSelectedRows={this.state.toggledClearRows}
                        paginationPerPage="100"
                        paginationRowsPerPageOptions={["30","50","100"]}                                      
                      />
                    </div> 
                </Card>
                

                <div className="small_nav">
                    <ModelCustomerCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>                





              <ModalProdcutPrice  cur_price_modal_customer={cur_price_modal_customer} products={products}   hidePriceModal={this.hidePriceModal} is_Open={price_is_Open}   />               
            </Container>   
                     
        )
    }
}

export default hot(module)(PanelCustomer);