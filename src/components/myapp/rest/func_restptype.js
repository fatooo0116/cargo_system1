

import axios from 'axios';

function get_ptype(callback){    
    axios.post('/wp-json/cargo/v1/get_ptype', {
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


function del_ptype(checked,callback){    
  axios.post('/wp-json/cargo/v1/del_ptype', {
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


function create_ptype(obj,callback){   

  axios.post('/wp-json/cargo/v1/create_ptype', obj)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};

function edit_ptype(obj,callback){   
  console.log(obj);
  
  axios.post('/wp-json/cargo/v1/edit_ptype', obj)
    .then(function (res) {
     
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
  

export { get_ptype,del_ptype,create_ptype,edit_ptype}