
/*  客戶地址  */

import axios from 'axios';

function get_all_ctype(callback){    
    axios.post('/wp-json/cargo/v1/get_customers_type', {
      page: 1,
      post_per_page: 99900
    })
    .then(function (res) {
      return callback(res.data);  
    })
    .catch(function (error) {
      console.log(error);
    });
};


function del_ctype(checked,callback){    
  axios.post('/wp-json/cargo/v1/del_customers_type', {
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


function create_ctype(obj,callback){   

  axios.post('/wp-json/cargo/v1/create_customers_type', obj)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};

function edit_ctype(obj,callback){   
  console.log(obj);
  
  axios.post('/wp-json/cargo/v1/edit_customers_type', obj)
    .then(function (res) {
     
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
  

export { get_all_ctype,del_ctype,create_ctype,edit_ctype}