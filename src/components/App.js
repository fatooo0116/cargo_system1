import React from "react";
import { hot } from "react-hot-loader";

import "./App.scss";
 

import PanelProduct from "./myapp/PanelProduct";
import PanelCustomer from "./myapp/PanelCustomer";
import PanelStaff from "./myapp/PanelStaff";
import PanelDep from './myapp/PanelDep';
import PanelProductType from './myapp/PanelProductType';
import PanelCustomerAddr from './myapp/PanelCustomerAddr';
import PanelCustomerType from './myapp/PanelCustomerType';

import { 
   Navbar,
   Nav,
   Form,
   Button,
   NavDropdown,
   FormControl  
  } from 'react-bootstrap';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      table:1,
      count: 6,
      postTypes: {},
      postResults: {},
      pages: {},
      results: "",
      blogname: "",
      initialRender: false
    };
    this.handleBlognameChange = this.handleBlognameChange.bind(this);
  }

  handleBlognameChange(event) {
    this.setState({
      blogname: event.target.value
    });
  }

  render() {

    const {table} = this.state;

    return (
      <div>

          <Navbar  id="global_nav"   expand="lg">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link onClick={()=>{ this.setState({table:2}); }}>客戶</Nav.Link>
                <Nav.Link onClick={()=>{ this.setState({table:1}); }}>產品</Nav.Link>

                <NavDropdown title="設定" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>{ this.setState({table:3}); }}>客戶類別</NavDropdown.Item>
                  <NavDropdown.Item onClick={()=>{ this.setState({table:4}); }}>客戶地址</NavDropdown.Item>    
                  <NavDropdown.Item onClick={()=>{ this.setState({table:5}); }}>部門資料</NavDropdown.Item> 
                  <NavDropdown.Item onClick={()=>{ this.setState({table:6}); }}>人員資料</NavDropdown.Item> 
                  <NavDropdown.Item onClick={()=>{ this.setState({table:7}); }}>產品類別</NavDropdown.Item>  
                </NavDropdown>

              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          {(table==1) ? <PanelProduct  /> : ''}
          {(table==2) ? <PanelCustomer  /> : ''}
          {(table==3) ? <PanelCustomerType /> : ''}
          {(table==4) ? <PanelCustomerAddr  /> : ''}
          {(table==5) ? <PanelDep  /> : ''}
          {(table==6) ? <PanelStaff  /> : ''}
          {(table==7) ? <PanelProductType  /> : ''}
          

        
       
      </div>
    );
  }
}

export default hot(module)(App);
