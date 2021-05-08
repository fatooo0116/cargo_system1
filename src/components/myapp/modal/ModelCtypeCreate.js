import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';

import {create_ctype } from '../rest/func_restctype';

        

class ModelCtypeCreate extends React.Component {
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

         // console.log(fields);
          
       
         create_ctype(fields,function(data){
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
      const {is_Open, dep_id, dep_name } = this.state;
      const {name,pdata} = this.props;

      console.log(this.state);
    

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
            <label className="dfx">
              <div className="nf">類別編號:</div> <input type="text" onChange={this.handleChange.bind(this, "customer_catgory_id")} value={this.state.fields["customer_catgory_id"]} />
              <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_catgory_id"]}</span>
            </label>

            <label className="dfx">
              <div className="nf">類別名稱:</div> <input type="text" onChange={this.handleChange.bind(this, "customer_catgory_name")} value={this.state.fields["customer_catgory_name"]} />
              <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_catgory_name"]}</span>
            </label>

            <label className="dfx">
              <div className="nf">類別英文名稱:</div> <input type="text" onChange={this.handleChange.bind(this, "customer_catgory_eng_name")} value={this.state.fields["customer_catgory_eng_name"]} />
              <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_catgory_eng_name"]}</span>
            </label>

            <label className="dfx">
              <div className="nf">其他:</div> <input type="text" onChange={this.handleChange.bind(this, "other")} value={this.state.fields["other"]} />
              <span className="error_text" style={{color: "red"}}>{this.state.errors["other"]}</span>
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


export default hot(module)(ModelCtypeCreate);