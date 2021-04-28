import React from "react";
import { hot } from "react-hot-loader";

import { 
         Button,
         Modal
        } from 'react-bootstrap';


// import { edit_dep } from '../rest/func_restdep';

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
        dep_id: pdata.dep_id,
        dep_name: pdata.dep_name,
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

     if(!fields["dep_name"]){
        formIsValid = false;
        errors["dep_name"] = "Cannot be empty";
     }
     if(!fields["dep_id"]){
      formIsValid = false;
       errors["dep_id"] = "Cannot be empty";
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

          
          edit_dep(fields,function(data){
          
                     
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
                部門編號: <input type="text" onChange={this.handleChange.bind(this, "dep_id")} value={this.state.fields["dep_id"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["dep_id"]}</span>
              </label>

              <label>
                業務名稱: <input type="text" onChange={this.handleChange.bind(this, "dep_name")} value={this.state.fields["dep_name"]} />
                <span className="error_text" style={{color: "red"}}>{this.state.errors["dep_name"]}</span>
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