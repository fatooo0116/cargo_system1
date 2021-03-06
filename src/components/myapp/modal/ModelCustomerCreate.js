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

import AlertBox from '../msgBox/AlertBox';



class ModelCustomerCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          fields: {},
          errors: {},
          ctype:[],
          is_alert_open:false,
          alert_msg:'',
          alert_status:0
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

         
          
       
         create_customer(fields,function(pdata){

         
          let data = JSON.parse(pdata);

            if(data.status){
              /*  Create Success  */
              me.setState({
                is_Open:false,
                fields: {},
                is_alert_open:true,
                alert_msg:'????????????',
                alert_status:1
              });

            }else{
              /*  Create Error  */
              me.setState({
                is_Open:false,
                fields: {},
                is_alert_open:true,
                alert_msg:data.error,
                alert_status:0
              });
            }

            // console.log(data);
            // me.error_modal();
            
            me.props.fetch_all();            
          });
          

      }else{
          alert("???????????????")
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
    
      const {is_Open,ctype,is_alert_open,alert_msg,alert_status} = this.state;
      const {name,staff} = this.props;
   
    
      let ctype_select  = [];
      ctype.forEach(function(item){
        ctype_select.push(<option value={item.customer_catgory_id} >{item.customer_catgory_name}</option>);
      })

      let staff_select  = [];
      staff.forEach(function(item){
        staff_select.push(<option value={item.staff_id} >{item.staff_name}</option>);
      })


      let payment = ['none','EXW','FOB','FOR','CIF','C&F'];
      let payment_select = [];
      payment.forEach(function(item){       
       // console.log(is_select);
        if(item=='none'){
          payment_select.push(<option value='none'  >?????????</option>);
        }else{
          payment_select.push(<option value={item}  >{item}</option>);
        }
        
      });



      return(
        <div>
        <Button variant="outline-dark"  onClick={this.handleShow}>
         {name}
        </Button>
  
        <Modal size="lg" className="aloha_modal" show={is_Open} onHide={this.handleClose}>

        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>????????????</Modal.Title>
          </Modal.Header>

          <Modal.Body>     

              <Container>
                <Row>
                  <Col sm={5}>
                    <label className="dfx">
                      <div className="nf4">????????????:</div> <input type="text" onChange={this.handleChange.bind(this, "customer_id")} value={this.state.fields["customer_id"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["customer_id"]}</span>
                    </label>
                  </Col>
                  <Col sm={5} >
                    <Form.Group  className="dfx"  controlId="exampleForm.SelectCustom">
                      <Form.Label>??????:</Form.Label>
                      <Form.Control as="select" custom  onChange={this.handleChange.bind(this, "customer_category_id")}>
                        {ctype_select}                        
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col sm={2}>
                    <label>
                      <input type="checkbox"  onChange={this.handleChange_checkbox.bind(this, "is_temp")}    />
                        ??????
                    </label>
                  </Col>
                </Row>

                <Row>
                <Col sm={5}>
                  <label className="dfx">
                    <div className="nf4">????????????:</div> <input type="text" onChange={this.handleChange.bind(this, "cname")} value={this.state.fields["cname"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["cname"]}</span>
                  </label>
                </Col>
                  <Col sm={5}  >
                  <label className="dfx form-label">
                    <div className="form-label">??????:</div> <input type="text" onChange={this.handleChange.bind(this, "addr_id")} value={this.state.fields["addr_id"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["addr_id"]}</span>
                  </label>
                </Col>
                <Col sm={2}>
                    <label>
                      <input type="checkbox" onChange={this.handleChange_checkbox.bind(this, "is_global")}  checked={(Number)(this.state.fields["is_global"])}  />
                        ??????
                    </label>
                </Col>
                </Row>

                <Row>
                <Col sm={5}>
                  <label className="dfx">
                    <div className="nf4">????????????:</div> <input type="text" onChange={this.handleChange.bind(this, "account_id")} value={this.state.fields["account_id"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["account_id"]}</span>
                  </label>
                </Col>
                <Col sm={3}  >
                  <label className="dfx form-label">
                    <div className="form-label">??????:</div>                     
                    <Form.Control  style={{"width":"90px"}} as="select"   onChange={this.handleChange.bind(this, "dollar_mark")}>
                        <option  value="USD" >USD</option>        
                        <option  value="NTD" >NTD</option>        
                      </Form.Control>                    
                  </label>
                </Col>
                <Col sm={3}>
                  <label className="dfx2">
                      <div className="form-label">??????(%):</div>  
                      <input type="number"  onChange={this.handleChange.bind(this, "tax")}  value={this.state.fields["tax"]}  />  
                  </label>
                </Col>
                </Row>  




                <Row>
                <Col sm={12}>
                  <label className="dfx">
                    <div className="nf4">????????????:</div> 
                    <input  style={{'width':'72%'}}  type="text" onChange={this.handleChange.bind(this, "cemail")} value={this.state.fields["cemail"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["cemail"]}</span>
                  </label>
                </Col>
              </Row>

              <Row>
              <Col sm={5}>
                    <Form.Group  className="dfx1"  controlId="exampleForm.SelectCustom">
                      <Form.Label  style={{"margin-bottom":"0px"}} >????????????</Form.Label>
                      <Form.Control as="select" style={{"width":"100%"}} custom  onChange={this.handleChange.bind(this, "staff_id")}>
                      <option value="">???????????????</option>
                      {staff_select}                       
                      </Form.Control>
                    </Form.Group>
                </Col>
                <Col sm={5}  >
                    <Form.Group  className="df_select1"  controlId="exampleForm.SelectCustom">
                      <Form.Label  style={{"margin-bottom":"0px"}} >TERM OF PAYMENT:</Form.Label>
                      <Form.Control  style={{"width":"100%"}} as="select"   onChange={this.handleChange.bind(this, "termofpayment")}>
                        {payment_select}                        
                      </Form.Control>
                    </Form.Group>
                </Col>
              </Row> 



                <hr/>
                <Row>
                  <Col sm={6}>

                    <label className="dfx">
                      <div className="nf">?????????:</div> <input type="text" onChange={this.handleChange.bind(this, "contact")} value={this.state.fields["contact"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact"]}</span>
                    </label>  
                    
                    <label className="dfx">
                      <div className="nf">???????????????: </div> <input type="text" onChange={this.handleChange.bind(this, "contact_job")} value={this.state.fields["contact_job"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_job"]}</span>
                    </label>  

                    <label className="dfx">
                      <div className="nf">???????????????1:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel1")} value={this.state.fields["contact_tel1"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel1"]}</span>
                    </label>  

                    <label className="dfx">
                      <div className="nf">???????????????2:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel2")} value={this.state.fields["contact_tel2"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel2"]}</span>
                    </label>

                    <label className="dfx">
                      <div className="nf">???????????????3:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_tel3")} value={this.state.fields["contact_tel3"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_tel3"]}</span>
                    </label>

                    <label className="dfx">
                      <div className="nf">???????????????:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_mobile")} value={this.state.fields["contact_mobile"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_mobile"]}</span>
                    </label>

                    <label className="dfx">
                    <div className="nf">???????????????:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_fax")} value={this.state.fields["contact_fax"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_fax"]}</span>
                    </label>


                    <label className="dfx">
                      <div className="nf">?????????Email:</div> <input type="text" onChange={this.handleChange.bind(this, "contact_email")} value={this.state.fields["contact_email"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["contact_email"]}</span>
                    </label>  

                  </Col>
                  <Col sm={6}>
                  <label className="dfx-wrap">
                    ????????????: <input type="hidden" onChange={this.handleChange.bind(this, "trade_mark")} value={this.state.fields["trade_mark"]} />
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
            <Button variant="secondary" onClick={this.handleClose}>??????</Button>
            <input variant="primary" className="btn btn-primary" type="submit" value="????????????" />
          </Modal.Footer>
          </form>

        </Modal>

        {(is_alert_open)?
        <AlertBox name={alert_msg}
                  alert_status={alert_status}
                  is_Open={is_alert_open} 
                  hideAlertModal={()=> this.setState({is_alert_open:false}) } />:''}


        </div>
      )
    };
  }


export default hot(module)(ModelCustomerCreate);