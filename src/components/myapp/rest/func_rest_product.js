/*  客戶地址  */
import axios from 'axios';

function get_all_product(callback){    
    axios.post('/wp-json/cargo/v1/get_products', {
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


function del_product(checked,callback){    
  axios.post('/wp-json/cargo/v1/del_product', {
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


function create_product(obj,callback){   

  axios.post('/wp-json/cargo/v1/create_product', obj)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};


function edit_product(obj,callback){   
  console.log(obj);
  
  axios.post('/wp-json/cargo/v1/edit_product', obj)
    .then(function (res) {
     
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
  

export { get_all_product,del_product,create_product,edit_product}
