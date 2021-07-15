import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
    Dropdown
        } from 'react-bootstrap';

 
    

class CatDropDown extends React.Component {


    constructor(props) {
        super(props);
        
        this.state = {
            data:[],                  
        }
      }


      componentDidMount() {    
        let me = this;

        axios.post('/wp-json/cargo/v1/terms', {})
        .then(function (res) {          
          
          me.setState({
            data:res.data,            
          });
        })
        .catch(function (error) {
          console.log(error);
        }); 
      }    



    render(){
        const {data} = this.state;

        console.log(data);

        let menu_tpl = [];
        if(data){        
             if(data.length>0){
                data.forEach(function(itm){
                    
                // console.log(itm);
                
                    
                    if(itm.hasOwnProperty('children')){
                        let childBox1 = [];
                        itm.children.forEach(function(itm1){
                            menu_tpl.push(<Dropdown.Item className="level0" href="#/action-1">{itm.term_name}</Dropdown.Item>);


                            if(itm1.hasOwnProperty('children')){
                                menu_tpl.push(<Dropdown.Item className="level1" href="#/action-1">{itm1.term_name}{childBox2}</Dropdown.Item>);
                                
                                let childBox2 = [];
                                itm1.children.forEach(function(itm2){
                                    
                                    let childBox3 = [];
                                    if(itm2.hasOwnProperty('children')){
                                        menu_tpl.push(<Dropdown.Item className="level2" href="#/action-1">{itm2.term_name}{childBox3}</Dropdown.Item>);

                                        itm2.children.forEach(function(itm3){
                                            menu_tpl.push(<Dropdown.Item  className="level3" href="#/action-1">{itm3.term_name}</Dropdown.Item>);
                                        });
                                       
                                       
                                    }else{
                                        menu_tpl.push(<Dropdown.Item className="level2" href="#/action-1">{itm2.term_name}</Dropdown.Item>);
                                    }                                
                                });
                                
                               
                            }else{
                                childBox1.push(<Dropdown.Item className="level1" href="#/action-1">{itm1.term_name}</Dropdown.Item>);
                            }                        
                        });
                        
                    }else{
                        menu_tpl.push(<Dropdown.Item className="level0" href="#/action-1">{itm.term_name}</Dropdown.Item>);
                    }       
                        
                });
            }
        }



        return(
                    <Dropdown>
                      <Dropdown.Toggle  
                                        variant="secondary"
                                        title="Drop small">產品類別
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        {menu_tpl}
                      </Dropdown.Menu>
                    </Dropdown>   
        )
    }
}

export default hot(module)(CatDropDown);