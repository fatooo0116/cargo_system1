import React from "react";
import { hot } from "react-hot-loader";

import { 
  Button,
  Modal,
  Row,
  Container,
  Col,
  Form
 } from 'react-bootstrap';

import {create_customer } from '../rest/func_rest_customer';

import { get_all_ctype } from '../rest/func_restctype';


class ModelCustomerCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          fields: {},
          errors: {},
          ctype:[]
        }
    }
    

    componentDidMount() {
      let me = this;
      get_all_ctype(function(data){      
        
      //  console.log(data);

        me.setState({
         ctype:data
        });
        
      });
    }

    handleShow = () =>{  

      this.setState({
        is_Open:true
      });

      let me = this;
      wp.media.editor.send.attachment = function(props, attachment){
         let { fields } = me.state;
         fields.trade_mark = attachment.url;
        //  console.log(attachment.url);
          // console.log(me.state);
          me.setState({ fields:fields});
      }        
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
          // console.log("create ...");
          let fields = this.state.fields;

         
          
       
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

    medaiUpload = () =>{
          window.wp.media.editor.open();    
       }

      handleChange_checkbox(field, e){         
          let fields = this.state.fields;
          let chbox = (e.target.checked) ? true :false; 
           
          fields[field] = chbox;        
          this.setState({fields});
         // console.log(e.target.value);
        }




    render() {
      const {is_Open,ctype} = this.state;
      const {name} = this.props;
   
    
      let ctype_select  = [];
      ctype.forEach(function(item){
        ctype_select.push(<option value={item.customer_catgory_id} >{item.customer_catgory_name}</option>);
      })


      return(
        <div>
        <Button variant="outline-dark"  onClick={this.handleShow}>
         {name}
        </Button>
  
        <Modal size="lg" className="aloha_modal" show={is_Open} onHide={this.handleClose}>

        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>新增資料</Modal.Title>
          </Modal.Header>

          <Modal.Body>     

              <Container>
                <Row>
                  <Col sm={5}>
                    <label className="dfx">
                      <div className="nf4">客戶編號:</div> <input type="text" onChange={this.handleChange.bind(this, "customer_id")} value={this.state.fields["customer_id"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_id"]}</span>
                    </label>
                  </Col>
                  <Col sm={5} >
                    <Form.Group  className="dfx"  controlId="exampleForm.SelectCustom">
                      <Form.Label>類別</Form.Label>
                      <Form.Control as="select" custom  onChange={this.handleChange.bind(this, "customer_category_id")}>
                        {ctype_select}                        
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={2}>
                    <label>
                      <input type="checkbox"  onChange={this.handleChange_checkbox.bind(this, "is_temp")}    />
                        臨時
                    </label>
                  </Col>
                </Row>

                <Row>
                <Col sm={5}>
                  <label className="dfx">
                    <div className="nf4">客戶全稱:</div> <input type="text" onChange={this.handleChange.bind(this, "cname")} value={this.state.fields["cname"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["cname"]}</span>
                  </label>
                </Col>
                  <Col sm={5}  >
                  <label className="dfx">
                    <div className="nf4">區域:</div> <input type="text" onChange={this.handleChange.bind(this, "addr_id")} value={this.state.fields["addr_id"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["addr_id"]}</span>
                  </label>
                </Col>
                <Col sm={2}>
                    <label>
                      <input type="checkbox" onChange={this.handleChange_checkbox.bind(this, "is_global")}  checked={(Number)(this.state.fields["is_global"])}  />
                        外商
                    </label>
                </Col>
                </Row>

                <Row>
                <Col sm={5}>
                  <label className="dfx">
                    <div className="nf4">帳戶歸屬:</div> <input type="text" onChange={this.handleChange.bind(this, "account_id")} value={this.state.fields["account_id"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["account_id"]}</span>
                  </label>
                </Col>
                <Col sm={5}  >
                  <label className="dfx">
                    <div className="nf4">幣別:</div> <input type="text" onChange={this.handleChange.bind(this, "dollar_mark")} value={this.state.fields["dollar_mark"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["dollar_mark"]}</span>
                  </label>
                </Col>
                  <Col sm={2}>
                  </Col>
                </Row>  

                <hr/>
                <Row>
                  <Col sm={6}>

                    <label className="dfx">
                      <div className="nf">聯絡人:</div> <input type="text" onChange={this.handleChange.bind(this, "contact")} value={this.state.fields["contact"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact"]}</span>
                    </label>  
                    
                    <label className="dfx">
                      <div className="nf">聯絡人職稱: </div> <input type="text" onChange={this.handleChange.bind(this, "contact_job")} value={this.state.fields["contact_job"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_job"]}</span>
                    </label>  

                    <label className="dfx">
                      <div className="nf">聯絡人電話1:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel1")} value={this.state.fields["contact_tel1"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel1"]}</span>
                    </label>  

                    <label className="dfx">
                      <div className="nf">聯絡人電話2:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel2")} value={this.state.fields["contact_tel2"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel2"]}</span>
                    </label>

                    <label className="dfx">
                      <div className="nf">聯絡人電話3:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel3")} value={this.state.fields["contact_tel3"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel3"]}</span>
                    </label>

                    <label className="dfx">
                      <div className="nf">聯絡人手機:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_mobile")} value={this.state.fields["contact_mobile"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_mobile"]}</span>
                    </label>

                    <label className="dfx">
                    <div className="nf">聯絡人傳真:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_fax")} value={this.state.fields["contact_fax"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_fax"]}</span>
                    </label>


                    <label className="dfx">
                      <div className="nf">聯絡人Email:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_email")} value={this.state.fields["contact_email"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_email"]}</span>
                    </label>  

                  </Col>
                  <Col sm={6}>
                  <label className="dfx-wrap">
                    客戶麥頭: <input type="hidden" onChange={this.handleChange.bind(this, "trade_mark")} value={this.state.fields["trade_mark"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["trade_mark"]}</span>
                    <Button onClick={this.medaiUpload} size="sm" >Upload</Button>
                    <div className="preview">
                        {(this.state.fields["trade_mark"])? <img src={this.state.fields["trade_mark"]}/> :''}
                    </div>
                  </label>  
                  </Col>
                </Row>                       
              </Container>  


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