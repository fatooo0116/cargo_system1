import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';


import { edit_product } from '../rest/func_rest_product';      

class ModelProductEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         is_Open:false,

         /*  form  */
         fields: {},
         cur_id:0,
         errors: {}
        }
    }
    

    componentDidMount() {
      const { pdata } = this.props;
       
     
      
      this.setState({
        fields : pdata,
        cur_id:pdata.id 
      });
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
      this.setState({
        is_Open:true
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

      if(this.handleValidation()){
          
          let fields = me.state;

          console.log(fields);

          
          edit_product(fields,function(data){
          
                     
            me.setState({
              is_Open:false,
              fields: {}
            });
            me.props.fetch_all();
            
            
          });
          
          

      }else{
          alert("請完成表單")
      }
    }




    render() {

      const {is_Open, dep_id, dep_name } = this.state;
      const {name} = this.props;

     // console.log(this.props);

      return(
        <div>
        <Button variant="outline-dark" size="sm" onClick={this.handleShow}>
         {name} 
        </Button>
  
        <Modal  className="aloha_modal" show={is_Open} onHide={this.handleClose}>
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>編輯資料</Modal.Title>
            </Modal.Header>

            <Modal.Body>            
            <label>
                產品編號: <input type="text" onChange={this.handleChange.bind(this, "product_id")} value={this.state.fields["product_id"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["product_id"]}</span>
              </label>

              <label>
                產品名稱: <input type="text" onChange={this.handleChange.bind(this, "product_name")} value={this.state.fields["product_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["product_name"]}</span>
              </label>

              <label>
                產品名稱英文: <input type="text" onChange={this.handleChange.bind(this, "product_eng_name")} value={this.state.fields["product_eng_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["product_eng_name"]}</span>
              </label>   

              <label>
                產品類別: <input type="text" onChange={this.handleChange.bind(this, "type_name")} value={this.state.fields["type_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["type_name"]}</span>
              </label>       
              
              <label>
                單位編號: <input type="text" onChange={this.handleChange.bind(this, "unit_sn")} value={this.state.fields["unit_sn"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["unit_sn"]}</span>
              </label> 

              <label>
                計量編號: <input type="text" onChange={this.handleChange.bind(this, "out_pack_unit")} value={this.state.fields["out_pack_unit"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["out_pack_unit"]}</span>
              </label>                 

              <label>
                計量編號中文: <input type="text" onChange={this.handleChange.bind(this, "unit_sn_cht")} value={this.state.fields["unit_sn_cht"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["unit_sn_cht"]}</span>
              </label>  
 
              
              <label>
                CUFT: <input type="text" onChange={this.handleChange.bind(this, "cuft")} value={this.state.fields["cuft"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["cuft"]}</span>
              </label>       

              <label>
                外包裝: <input type="text" onChange={this.handleChange.bind(this, "out_pack")} value={this.state.fields["out_pack"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["out_pack"]}</span>
              </label>  

              <label>
                內包裝: <input type="text" onChange={this.handleChange.bind(this, "in_pack")} value={this.state.fields["in_pack"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["in_pack"]}</span>
              </label> 

              <label>
                淨重: <input type="text" onChange={this.handleChange.bind(this, "net_weight")} value={this.state.fields["net_weight"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["net_weight"]}</span>
              </label>  

              <label>
                總重: <input type="text" onChange={this.handleChange.bind(this, "gross_weight")} value={this.state.fields["gross_weight"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["gross_weight"]}</span>
              </label>                                                                                                                             
            </Modal.Body>
            

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>關閉</Button>
              <input variant="primary" className="btn btn-primary" type="submit" value="儲存送出" />
            </Modal.Footer>
            </form>
        </Modal>


        </div>
      )
    };
  }


export default hot(module)(ModelProductEdit);