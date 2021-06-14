import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal,
         Form
        } from 'react-bootstrap';


import { edit_staff, } from '../rest/func_reststaff';


class ModelStaffEdit extends React.Component {
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

          
          edit_staff(fields,function(data){
          
                     
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

      const {is_Open, fields} = this.state;
      const {name,all_dep} = this.props;

      // console.log(this.props);
      let me = this;
      let dep_select = [];


        all_dep.forEach(function(item){
          let is_select = (fields["dep_id"]==item.dep_id)? true : false;          
          dep_select.push(<option value={item.dep_id}  selected={is_select} >{item.dep_name}</option>);
        });  
      
  


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
                員工編號: <input type="text" onChange={this.handleChange.bind(this, "staff_id")} value={this.state.fields["staff_id"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["staff_id"]}</span>
              </label>



              <Form.Group  className="dfx"    controlId="dep_select_id">
                 <Form.Label>所屬部門</Form.Label>
                <Form.Control as="select" custom  onChange={this.handleChange.bind(this, "dep_id")}>
                  <option>請選擇部門</option>
                  {dep_select}                        
                </Form.Control>
              </Form.Group>


              <label>
              中文姓名: <input type="text" onChange={this.handleChange.bind(this, "staff_name")} value={this.state.fields["staff_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["staff_name"]}</span>
              </label>

              <label>
                英文姓名: <input type="text" onChange={this.handleChange.bind(this, "staff_eng_name")} value={this.state.fields["staff_eng_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["staff_eng_name"]}</span>
              </label>

              <label>
                電子郵件: <input type="text" onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["email"]}</span>
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


export default hot(module)(ModelStaffEdit);