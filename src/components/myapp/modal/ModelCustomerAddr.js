import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal,
         Row,
         Container,
         Col,
         Table
        } from 'react-bootstrap';

// import { edit_customer } from '../rest/func_rest_customer';

import { get_customers_addr,create_addr,edit_addr} from '../rest/func_restaddr';

import AddrItem from './tpl/AddrItem';


class ModelCustomerAddr extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         is_Open:false,
         allAddr: [],
         /*  form  */
         fields:{},
         cur_id:0,
         errors: {},
         cur_user:0,
         model:'1', /*  1 => 新增 , 2 => 更新 */
         loading:1
        }
    }
    

    componentDidMount(){
      let me = this;
    }






    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      /*
     if(!fields["dep_name"]){
        formIsValid = false;
        errors["dep_name"] = "Cannot be empty";
     }
     if(!fields["dep_id"]){
      formIsValid = false;
       errors["dep_id"] = "Cannot be empty";
    }
    */

     this.setState({errors: errors});
     return formIsValid;
    }




    handleShow = () =>{
      const { pdata } = this.props;    

      let me = this;  
      get_customers_addr(pdata.customer_id,function(data){      
        me.setState({
          allAddr:data,    
          loading:0          
        });          
      }); 

      console.log(pdata);

      me.setState({        
        is_Open:true,  
        allAddr:[],  
        customer_id:pdata.customer_id,          
        cur_id:pdata.id,         
      }); 
    }


    
    handleClose = () =>{     
      this.setState({
        is_Open:false
      });           
    }
  


    handleChange(field, e){         
      let fields = this.state.fields;
      fields[field] = e.target.value;        
      this.setState({fields});
    }



    handleSubmit = (e) =>{
      e.preventDefault();

      let me = this;
      let fields = this.state.fields;

      if(this.handleValidation()){                  
          console.log(this.state);
          create_addr(fields,function(data){
            console.log(data);
          });
      }else{
          alert("請完成表單")
      }
    }
    


    reloadAddrList = () =>{
  
    }
  



    render() {

      const {is_Open,allAddr,loading} = this.state;
      const {name,pdata} = this.props;


      let me = this;


      
      let min_list = [];     
      
      if(allAddr.length>0){
        allAddr.forEach(function(item){
          min_list.push( <AddrItem data={item} />)
        });
      }else{
        min_list.push( <tr><td>無地址資料</td></tr>)
      } 
      

      

      return(
        <div>
        <Button variant="outline-dark" size="sm" onClick={this.handleShow}>
         {name} 
        </Button>
        
        {(is_Open) ? 
        <Modal  size="lg" className="aloha_modal" show={is_Open} onHide={this.handleClose}>
          
            <Modal.Header closeButton>
              <Modal.Title>{pdata.cname} - 地址編輯</Modal.Title>
            </Modal.Header>

            <Modal.Body>     

            <form onSubmit={this.handleSubmit}>
            <Container id="address_box">
              <Row>
                <Col sm={12}>
                  <b>請輸入地址</b>
                  <label className="dfx">
                    <input type="text"  className="zipcode" onChange={this.handleChange.bind(this, "zip")}   placeholder="郵遞區號"/>
                    <input type="text" className="full_width" onChange={this.handleChange.bind(this, "address_text")}  placeholder="地址" />
                  </label>
                </Col>           
              </Row>

              <Row>
                <Col sm={4}>
                  <label className="">                    
                     <input   type="hidden" onChange={this.handleChange.bind(this, "customer_id")}  value={pdata.customer_id} />   
                     <input  placeholder="姓名" type="text" onChange={this.handleChange.bind(this, "contact")} />                    
                  </label>
                </Col>
                <Col sm={4}>
                  <label className="">
                     <input  placeholder="職稱" type="text" onChange={this.handleChange.bind(this, "contact_title")}  />                    
                  </label>
                </Col>
                <Col sm={4}  >
                  <label className="">
                    <input type="text" onChange={this.handleChange.bind(this, "contact_phone")}  placeholder="電話"  />
                  </label>
                </Col>
                <Col sm={4}>
                  <label className="">
                    <input type="text" onChange={this.handleChange.bind(this, "contact_fax")} placeholder="傳真"  />
                  </label>
                </Col>
                <Col sm={4}>
                    <input variant="primary" className="btn btn-primary" type="submit" value="新增" />
                </Col>                
              </Row>  

             
                {(loading==1) ? <h5 style={{'text-align':'center'}}>Loading</h5> :
                <div className="address_list">
                  <table size="sm" className="table table-striped  table-hover">
                   {min_list}
                  </table>                               
                </div>
               }
            </Container>  
            </form>

            </Modal.Body>                      
        </Modal> : '' }


        </div>
      )
    };
  }


export default hot(module)(ModelCustomerAddr);
