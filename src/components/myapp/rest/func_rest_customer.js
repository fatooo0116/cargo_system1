/*  客戶地址  */
import axios from 'axios';

function get_all_customer(callback){    
    axios.post('/wp-json/cargo/v1/get_customers', {
        page: 1,
        post_per_page: 99900
      })
      .then(function (res) {
        //  console.log(res);
        return callback(res.data);       
      })
      .catch(function (error) {
        console.log(error);
      });
};


function del_customer(checked,callback){    
  axios.post('/wp-json/cargo/v1/del_customer', {
      checked: checked,      
    })
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
};


function create_customer(obj,callback){   

  axios.post('/wp-json/cargo/v1/create_customer', obj)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};

function edit_customer(obj,callback){   
  console.log(obj);
  
  axios.post('/wp-json/cargo/v1/edit_customer', obj)
    .then(function (res) {
     
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
  

export { get_all_customer,del_customer,create_customer,edit_customer}
