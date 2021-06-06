import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Button 
        } from 'react-bootstrap';


import  ModelPtypeCreate from './modal/ModelPtypeCreate';
import  ModelPtypeEdit from './modal/ModelPtypeEdit';
import { get_ptype, del_ptype } from './rest/func_restptype';
        


import DataTable, { createTheme } from 'react-data-table-component';





class PanelMutiUploadImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data1:'',
          check1:'',
          xout:'',
        }
    }

    componentDidMount() {}




    checkData1 = () =>{

      const {data1} = this.state;
      let arr_data1 = data1.split('\n');
      console.log(arr_data1); 
      this.setState({check1:arr_data1});
    }





    setCategory = () =>{
        let me = this;
        const {check1,check2} = this.state;
        axios.post('/wp-json/cargo/v1/imgupload', {
          check1: check1,          
        })
        .then(function (res) {
            console.log(res.data);
           // me.setState({check1:res.data.length});
           // return callback(res.data);   
           // me.setState({xout:res.data});    
        })
        .catch(function (error) {
          console.log(error);
        });

    }




    render() {

        const {data1,check1,xout} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        // console.log(data);



        return (

            <Container id="aloha_app" >
              <br/>
                <h3>圖檔上傳</h3>

                <Card>
                <div className="card-body">

                    <div  className="chk_box1">
                      <textarea  name="category_api" onChange={(e)=> this.setState({data1:e.target.value})}  value={data1}></textarea>
                      <div className="chk">
                          {JSON.stringify(check1)}
                      </div>
                      <div className="action">
                        <Button  onClick={this.checkData1} >check</Button>
                      </div>
                    </div>
         


                    <Button onClick={this.setCategory}  >Set3</Button>

                    <div  className="chk_box1">
                    <div  name="category_api" id="infobox" style={{"width":"100%","height":"150px"}} >
                      {JSON.stringify(xout)}
                    </div>
                    </div>

                 
                    

                  </div>
                </Card>



                
                          
            </Container>            
        )
    }
}

export default hot(module)(PanelMutiUploadImage);