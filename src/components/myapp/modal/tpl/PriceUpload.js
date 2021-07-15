import React from "react";
import { hot } from "react-hot-loader";
import { 
  Button,
  Modal
 } from 'react-bootstrap';

import axios from 'axios';

   
// import {get_customer_price,update_price} from '../../rest/func_rest_price';
import DataTable, { createTheme } from 'react-data-table-component';




class PriceUpload extends React.Component {
    constructor(props) {
        super(props);

        this.state = {             
            selectedFile: null,
            preview_modal:false,
            success:0,
            error:0,
            inputfile:''
        }
    }


    
    componentDidMount(){}


    componentWillUnmount(){
       // clearInterval(this.timerID);
    }
 


    onFileChange = event => { 
        // Update the state 
        this.setState({ selectedFile: event.target.files[0] }); 

        let me = this;
        setTimeout(function(){
          me.onFileUpload();
        },500);
    }; 


    onFileUpload = () => { 
        // Create an object of formData 
        const formData = new FormData(); 
       
        let me = this;

        // Update the formData object 
        formData.append( 
          "myPrice", 
          this.state.selectedFile, 
          this.state.selectedFile.name 
        ); 
       

        let filex = this.state.selectedFile.name.split('.');
        console.log(filex);
        if(filex[1]!='xlsx' & filex[1]!='xls'){
          alert('請上傳 excel');
          return false;
        }
     
        axios.post("/wp-json/cargo/v1/price_upload", formData).then(function (res) {
            // console.log(res); 
            let data = JSON.parse(res.data);
            // console.log(data);

            console.log(data);
        

          

            me.setState({
              // data:format_data,\
              success:data.success,
              error:data.error,
              selectedFile: null,
              preview_modal:true,
              inputfile:''
            });
            
        })
        .catch(function (error) {
          console.log(error);
        });; 
      };





    fileData = () => { 
      /*
        if (this.state.selectedFile) { 
            
          return ( 
            <div> 
              
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
              <span>Choose file before Pressing the Upload button</span> 
            </div> 
          ); 
        } 
        */
      }; 



    handlePreviewClose = () =>{
      this.setState({
        preview_modal:false
      });    
    }






    render(){
        const {
              preview_modal,
              success,
              error,
              inputfile} = this.state;     
       
          let error_detail = [];
          if(error){
            error.forEach(function(item){
              error_detail.push(<div className="error_list">{item.product_id} - {item.pname} <div className="msg">{item.msg}</div></div>);
            });
          }

          
  


        return(
            
                <div className="price_upload_box">
                    <div className="box">  
                    <label for="file-upload" class="btn btn-outline-info">
                      匯入價格
                    </label>                        
                        <input  id="file-upload" type="file"  value={inputfile} onChange={this.onFileChange}  hidden /> 
                    </div> 
                    {this.fileData()} 

                    <Modal className="preview_upload" show={preview_modal} onHide={this.handlePreviewClose}>       
                        <Modal.Title>&nbsp;</Modal.Title>
                        <Modal.Body>                                        
                          <div className="inner_box">
                                <h3>匯入完成</h3>
                                <ul>
                                  <li><b>成功匯入:</b>{(success) ? success.length : 0}</li>
                                  <li><b>失敗匯入:</b>{(error) ? error.length : 0}</li>
                                </ul>
                                <div className="error_import_list" >
                                <b>匯入失敗清單</b>  
                                  {error_detail}
                                </div>
                          </div>
                        </Modal.Body>     
                    </Modal>

                </div>
        )    
    }   
}


export default hot(module)(PriceUpload);