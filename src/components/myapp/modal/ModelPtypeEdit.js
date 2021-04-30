import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';


import { edit_ptype } from '../rest/func_restptype';

class ModelPtypeEdit extends React.Component {
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
       
      let fields = {
        type_id: pdata.type_id,
        type_name: pdata.type_name,
        type_eng_name: pdata.type_eng_name,
        stock_account: pdata.stock_account,
        out_account: pdata.out_account,
        in_account: pdata.in_account,
      };
      
      this.setState({
        fields : fields,
        cur_id:pdata.id 
      });
    }


    handleValidation(){
      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

     if(!fields["type_id"]){
        formIsValid = false;
        errors["type_id"] = "Cannot be empty";
     }
     if(!fields["type_name"]){
      formIsValid = false;
       errors["type_name"] = "Cannot be empty";
    }

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

          
          edit_ptype(fields,function(data){
          
                     
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

      const {is_Open} = this.state;
      const {name} = this.props;

     // console.log(this.props);

    //  console.log(this.state.fields);


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
                編號: <input type="text" onChange={this.handleChange.bind(this, "type_id")} value={this.state.fields["type_id"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["type_id"]}</span>
              </label>

              <label>
                名稱: <input type="text" onChange={this.handleChange.bind(this, "type_name")} value={this.state.fields["type_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["type_name"]}</span>
              </label>

              <label>
                英文名稱: <input type="text" onChange={this.handleChange.bind(this, "type_eng_name")} value={this.state.fields["type_eng_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["type_eng_name"]}</span>
              </label>

              <label>
                存貨科目: <input type="text" onChange={this.handleChange.bind(this, "stock_account")} value={this.state.fields["stock_account"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["stock_account"]}</span>
              </label> 

              <label>
                進貨科目: <input type="text" onChange={this.handleChange.bind(this, "in_account")} value={this.state.fields["in_account"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["in_account"]}</span>
              </label>     

              <label>
                進貨退出: <input type="text" onChange={this.handleChange.bind(this, "out_account")} value={this.state.fields["out_account"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["out_account"]}</span>
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


export default hot(module)(ModelPtypeEdit);