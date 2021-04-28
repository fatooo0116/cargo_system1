
import axios from 'axios';

function get_all_staff(callback){    
    axios.post('/wp-json/cargo/v1/get_staff', {
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


function del_staff(checked,callback){    
  axios.post('/wp-json/cargo/v1/del_staff', {
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


function create_staff(obj,callback){   

  axios.post('/wp-json/cargo/v1/create_staff', obj)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};

function edit_staff(obj,callback){   
  console.log(obj);
  
  axios.post('/wp-json/cargo/v1/edit_staff', obj)
    .then(function (res) {
     
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
    
};
  

export { get_all_staff,del_staff,create_staff,edit_staff}