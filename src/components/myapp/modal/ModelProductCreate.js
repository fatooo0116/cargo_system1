import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal,
         Col,
         Container,
         Row
        } from 'react-bootstrap';

 import {create_product } from '../rest/func_rest_product';      

    
import ProductTypeCheckBox from './tpl/ProductTypeCheckBox';
    

class ModelProductCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          is_Open:false,
          fields: {},
          errors: {},
          ptype_checked:[],
          attachment_id:0
        }
    }
    

    componentDidMount() {

    }

    handleShow = () =>{

      let me = this;

      this.setState({
        is_Open:true
      });

      wp.media.editor.send.attachment = function(props, attachment){
        let { fields } = me.state;

        // fields.trade_mark = attachment.url;     
        // let  woo_post_id = me.props.pdata.woo_id;
        // alert('upload '+attachment.id);
        me.setState({
          attachment_id:attachment.id,
          attachment_url:attachment.url
        });
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
          console.log("create ...");
          let fields = this.state.fields;

         // console.log(fields);
          
       
         create_product(
           {
             fields:fields,
             ptype_checked:ptype_checked
           },function(data){
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


    update_checked_ptype = (data) =>{
          this.setState({ptype_checked:data});
      }


    medaiUpload = () =>{
        window.wp.media.editor.open();    
      }
  



    render() {
      const {is_Open, dep_id, dep_name } = this.state;
      const {name,ptype} = this.props;

      console.log(this.state);
    

      return(
        <div>
        <Button variant="outline-dark" onClick={this.handleShow}>
         {name}
        </Button>
  
        <Modal className="aloha_modal"  size="lg"  show={is_Open} onHide={this.handleClose}>

        <form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>新增資料</Modal.Title>
          </Modal.Header>

          <Modal.Body id="prodcut_modal">  


 <Container >
              <Row>
                <Col sm={6}>

                <label>
                  <div className="nf7">產品編號:</div>
                  <input type="text" onChange={this.handleChange.bind(this, "product_id")} value={this.state.fields["product_id"]} />
                  <span className="error_text" style={{color: "red"}}>{this.state.errors["product_id"]}</span>
                </label>

                </Col>
                
                <Col sm={6}>
                  <ProductTypeCheckBox ptype={ptype}    update_checked_ptype={this.update_checked_ptype}  />
                </Col>                  
              </Row>

              <Row>
                <Col sm={12}>
                  <label>
                    <div className="nf7">產品名稱: </div>
                    <input type="text" onChange={this.handleChange.bind(this, "product_name")} value={this.state.fields["product_name"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["product_name"]}</span>
                  </label>
                </Col>

                <Col sm={12}>
                  <label>
                    <div className="nf7">產品名稱英文: </div>
                    <input type="text" onChange={this.handleChange.bind(this, "product_eng_name")} value={this.state.fields["product_eng_name"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["product_eng_name"]}</span>
                  </label> 
                </Col>                
              </Row>
          </Container>   


          <Container >
              <Row>
                <Col sm={6}>
                  <label>
                    <div className="nf7">單位編號: </div>
                    <input type="text" onChange={this.handleChange.bind(this, "unit_sn")} value={this.state.fields["unit_sn"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["unit_sn"]}</span>
                  </label>  
                  <label>
                    <div className="nf7">計量編號:</div> 
                    <input type="text" onChange={this.handleChange.bind(this, "out_pack_unit")} value={this.state.fields["out_pack_unit"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["out_pack_unit"]}</span>
                  </label>   
                  <label>
                    <div className="nf7">計量編號中文:</div> <input type="text" onChange={this.handleChange.bind(this, "unit_sn_cht")} value={this.state.fields["unit_sn_cht"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["unit_sn_cht"]}</span>
                  </label>    
                  <label>
                      <div className="nf7">外包裝:</div> 
                      <input type="text" onChange={this.handleChange.bind(this, "out_pack")} value={this.state.fields["out_pack"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["out_pack"]}</span>
                  </label>   
                  <label>
                    <div className="nf7">內包裝:</div> 
                    <input type="text" onChange={this.handleChange.bind(this, "in_pack")} value={this.state.fields["in_pack"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["in_pack"]}</span>
                  </label>    
                  
                  <label>
                      <div className="nf7">CUFT:</div> 
                      <input type="text" onChange={this.handleChange.bind(this, "cuft")} value={this.state.fields["cuft"]} />
                      <span className="error_text" style={{color: "red"}}>{this.state.errors["cuft"]}</span>
                  </label>   

                  <label>
                    <div className="nf7">淨重:</div>  <input type="text" onChange={this.handleChange.bind(this, "net_weight")} value={this.state.fields["net_weight"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["net_weight"]}</span>
                  </label>   

                  <label>
                    <div className="nf7">總重:</div>  <input type="text" onChange={this.handleChange.bind(this, "gross_weight")} value={this.state.fields["gross_weight"]} />
                    <span className="error_text" style={{color: "red"}}>{this.state.errors["gross_weight"]}</span>
                  </label>                                                                                                     
                </Col>

                <Col sm={6}>
                 
                  <label className="dfx-wrap">
                    產品圖片: <Button onClick={this.medaiUpload} size="sm" >Upload</Button>
                    <div className="preview">
                        {(this.state.attachment_url)? <img src={this.state.attachment_url}  onClick={this.medaiUpload} /> :''}
                    </div>
                  </label>
                </Col>  

              </Row>
          </Container >  







 
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


export default hot(module)(ModelProductCreate);