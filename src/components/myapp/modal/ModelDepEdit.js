import React from "react";
import { hot } from "react-hot-loader";

import { 
        Container,       
         Card,
         Dropdown,
         Button,
         Modal
        } from 'react-bootstrap';

class ModelDepEdit extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
         is_Open:false
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


    render() {

      const {is_Open} = this.state;
      const {name} = this.props;

    

      return(
        <div>
        <Button variant="outline-dark" size="sm" onClick={this.handleShow}>
         {name}
        </Button>
  
        <Modal show={is_Open} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            Woohoo, you're reading this text in a modal!
          </Modal.Body>
          
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>


        </div>
      )
    };
  }


export default hot(module)(ModelDepEdit);