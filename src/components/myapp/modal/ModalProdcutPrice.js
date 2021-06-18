import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';



import { get_all_product} from '../rest/func_rest_product';           
import DataTable, { createTheme } from 'react-data-table-component';
import ChangePriceUnit from './tpl/ChangePriceUnit';





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



  const FilterComp = ({ filterText, onFilter, onClear }) => (
    <>
    <input id="search_p" type="text" placeholder="Filter By Name" aria-label="Search Input" value={filterText} onChange={onFilter} />
    <Button id="search_btn" type="button" onClick={onClear}>X</Button>
    </>
  );



        
class ModalProdcutPrice extends React.Component{
    constructor(props) {
        super(props);

        this.state = {        
          price:[],
          is_Open:false,
          products:[],
          ori:[],
          filterText:''
        }
    }    


    componentDidMount() {     
        let me = this;

          get_all_product(function(products){
            me.setState({
              products:products,
              ori:products
            }); 
          });
    }
  

    handleClear = () =>{
      this.setState({
        products:this.state.ori,
        filterText:''
      });
    }

  
  



    getSubHeaderComponent = () => {
      let me =this;
      return (
        <FilterComp

          onFilter={(e) => {
            let newFilterText = e.target.value;                
            let ori_data = [...me.state.ori];

            //  console.log(ori_data);

         
            let filteredItems = ori_data.filter(
                (item) => item.product_name && item.product_name.includes(newFilterText) | item.product_id.includes(newFilterText)                    
              );
       
       
            me.setState({ 
              products:filteredItems,
              filterText: newFilterText 
            });
          }}
          onClear={this.handleClear}
          filterText={this.state.filterText}
        />
      );
    };






    render(){
      //  const {is_Open} = this.state;
        const { 
                is_Open,
                hidePriceModal,
                cur_price_modal_customer
             } = this.props;

        const { products } = this.state;


             /*
             if(products.length>0 & cur_price_table.length>0){
                products.forEach(function(item){
                  let obj = cur_price_table.filter(function(table_item){
                    return item.id == table_item.product_id
                  });
                  item['pprice'] = obj[0].price;                 
                });
             }
             */



             const columns = [
               /*
              {
                name: '#',
                selector: 'id',
                sortable: true,  
                width: '0%',                                     
              },
              */
                {
                    name: '產品編號',
                    selector: 'product_id',
                    sortable: true,  
                    width: '100px',                                         
                  },

                  {
                    name: '名稱',
                    selector: 'product_name',
                    sortable: true,  
                    width: '40%',                      
                    cell: (pid) => (pid.woo_id > 0)? <a href={"/wp-admin/post.php?post="+pid.woo_id+"&action=edit"}  target="_blank"  >{pid.product_name}</a> : pid.product_name , 
                  },
                  {
                    name: '價格設定',
                    cell: (pid) => {
                      return <ChangePriceUnit  pid={pid}  cid={cur_price_modal_customer}   />
                    },
                    ignoreRowClick: true,
                    allowOverflow: true,
                    button: true,
                    width: '40%',
                  }      
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
                            subHeader                         
                            columns={columns}
                            data={products}
                            pagination={true}   
                            onChangePage = { (page) => console.log(page)}
                            subHeaderComponent={this.getSubHeaderComponent()}  
                          //  subHeader
                          //  subHeaderComponent={this.getSubHeaderComponent()}                
                        />
                    </Modal.Body>          
            </form>
          </Modal> 
        )
    }
}
export default hot(module)(ModalProdcutPrice);