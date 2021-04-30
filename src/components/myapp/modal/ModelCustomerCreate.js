import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';

import {create_customer } from '../rest/func_rest_customer';

        


class ModelCustomerCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          fields: {},
          errors: {}
        }
    }
    

    componentDidMount() {

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





    handleSubmit = (e) =>{
      e.preventDefault();

      let me = this;

      if(this.handleValidation()){
          console.log("create ...");
          let fields = this.state.fields;

          console.log(fields);
          
       
         create_customer(fields,function(data){
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


    



    handleChange(field, e){         
            let fields = this.state.fields;
            fields[field] = e.target.value;        
            this.setState({fields});
        }





    render() {
      const {is_Open} = this.state;
      const {name} = this.props;

     // console.log(this.state);
    

      return(
        <div>
        <Button variant="outline-dark" onClick={this.handleShow}>
         {name}
        </Button>
  
        <Modal className="aloha_modal" show={is_Open} onHide={this.handleClose}>

        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>新增資料</Modal.Title>
          </Modal.Header>

          <Modal.Body>            
          <label>
                客戶麥頭: <input type="text" onChange={this.handleChange.bind(this, "tmark")} value={this.state.fields["tmark"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["tmark"]}</span>
              </label>  


              <label>
                編號: <input type="text" onChange={this.handleChange.bind(this, "customer_id")} value={this.state.fields["customer_id"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_id"]}</span>
              </label>

              <label>
                名稱: <input type="text" onChange={this.handleChange.bind(this, "cname")} value={this.state.fields["cname"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["cname"]}</span>
              </label>

              <label>
                聯絡人: <input type="text" onChange={this.handleChange.bind(this, "contact")} value={this.state.fields["contact"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact"]}</span>
              </label>  
              
              <label>
                聯絡人職稱: <input type="text" onChange={this.handleChange.bind(this, "contact_job")} value={this.state.fields["contact_job"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_job"]}</span>
              </label>  

              <label>
                聯絡人電話1: <input type="text" onChange={this.handleChange.bind(this, "contact_tel1")} value={this.state.fields["contact_tel1"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel1"]}</span>
              </label>  

              <label>
                聯絡人電話2: <input type="text" onChange={this.handleChange.bind(this, "contact_tel2")} value={this.state.fields["contact_tel2"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel2"]}</span>
              </label>

              <label>
                聯絡人電話3: <input type="text" onChange={this.handleChange.bind(this, "contact_tel3")} value={this.state.fields["contact_tel3"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel3"]}</span>
              </label>

              <label>
                聯絡人手機: <input type="text" onChange={this.handleChange.bind(this, "contact_mobile")} value={this.state.fields["contact_mobile"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_mobile"]}</span>
              </label>

              <label>
                聯絡人傳真: <input type="text" onChange={this.handleChange.bind(this, "contact_fax")} value={this.state.fields["contact_fax"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_fax"]}</span>
              </label>


              <label>
                聯絡人Email: <input type="text" onChange={this.handleChange.bind(this, "contact_email")} value={this.state.fields["contact_email"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_email"]}</span>
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


export default hot(module)(ModelCustomerCreate);