import React from "react";
import { hot } from "react-hot-loader";

import "./App.scss";
 

import PanelProduct from "./myapp/PanelProduct";
import PanelCustomer from "./myapp/PanelCustomer";
import PanelStaff from "./myapp/PanelStaff";
import PanelDep from './myapp/PanelDep';


import PanelProductFix from './myapp/PanelProductFix';
// import PanelCustomerAddr from './myapp/PanelCustomerAddr';
import PanelCustomerType from './myapp/PanelCustomerType';

import PanelSetCategory  from './myapp/PanelSetCategory';

import PanelProductAjax from "./myapp/PanelProductAjax";

import PanelMutiUploadImage from "./myapp/PanelMutiUploadImage";


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
      table:2,
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
           
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link  className={(table==2)? 'curx':''} onClick={()=>{ this.setState({table:2}); }}>客戶</Nav.Link>
                <Nav.Link  className={(table==1)? 'curx':''} onClick={()=>{ this.setState({table:1}); }}>產品</Nav.Link>

                <NavDropdown className={(table>2)? 'curx':''} title="設定" id="basic-nav-dropdown">
                  <NavDropdown.Item onClick={()=>{ this.setState({table:3}); }}>客戶類別</NavDropdown.Item>
                    
                  <NavDropdown.Item onClick={()=>{ this.setState({table:5}); }}>部門資料</NavDropdown.Item> 
                  <NavDropdown.Item onClick={()=>{ this.setState({table:6}); }}>人員資料</NavDropdown.Item> 
                  
                  {/*
                  <NavDropdown.Item onClick={()=>{ this.setState({table:7}); }}>類別轉檔</NavDropdown.Item> 

                  <NavDropdown.Item onClick={()=>{ this.setState({table:8}); }}>產品校正</NavDropdown.Item> 
                  */}
                  
                  
                </NavDropdown>

               

              </Nav>
            </Navbar.Collapse>
          </Navbar>

          {(table==1) ? <PanelProductAjax  /> : ''}
          {(table==2) ? <PanelCustomer  /> : ''}
          {(table==3) ? <PanelCustomerType /> : ''}
         
          {(table==5) ? <PanelDep  /> : ''}
          {(table==6) ? <PanelStaff  /> : ''}

          {(table==7) ? <PanelSetCategory /> : ''}

          
          {(table==8) ? <PanelProductFix /> : ''}
         
       
       
      </div>
    );
  }
}

export default hot(module)(App);
