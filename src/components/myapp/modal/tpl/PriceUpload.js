import React from "react";
import { hot } from "react-hot-loader";
import { 
    Button   
   } from 'react-bootstrap';

import axios from 'axios';

   
// import {get_customer_price,update_price} from '../../rest/func_rest_price';

class PriceUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {  
            selectedFile: null
        }
    }


    
    componentDidMount(){   
       

    }



    componentWillUnmount(){
       // clearInterval(this.timerID);
    }
 

    onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 
    }; 


    onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData(); 
       
        // Update the formData object 
        formData.append( 
          "myPrice", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        ); 
       
        // Details of the uploaded file 
        console.log(this.state.selectedFile); 
       
        // Request made to the backend api 
        // Send formData object 
        axios.post("/wp-json/cargo/v1/price_upload", formData).then(function (res) {
            // console.log(res); 
            let data = JSON.parse(res);
            console.log(data);
            
        })
        .catch(function (error) {
          console.log(error);
        });; 
      };





    fileData = () => { 
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              <h2>File Details:</h2> 
              <p>File Name: {this.state.selectedFile.name}</p> 
              <p>File Type: {this.state.selectedFile.type}</p> 
              <p> 
                Last Modified:{" "} 
                {this.state.selectedFile.lastModifiedDate.toDateString()} 
              </p> 
            </div> 
          ); 
        } else { 
          return ( 
            <div> 
              <br /> 
              <span>Choose before Pressing the Upload button</span> 
            </div> 
          ); 
        } 
      }; 



    render(){

        const {default_price,is_ready} = this.state;
        // console.log(pid);

       
        return(
            
                <div className="price_upload_box">
                    <div className="box">  
                        <input type="file" onChange={this.onFileChange} /> 
                        <button onClick={this.onFileUpload} type="Button"> 
                        Upload! 
                        </button> 
                    </div> 
                    {this.fileData()} 
                </div>
        )    
    }   
}


export default hot(module)(PriceUpload);