/*  客戶地址  */
import axios from 'axios';

function update_price(data,callback){  
  
    /*  不知新增還是更新  都傳三個  */
    axios.post('/wp-json/cargo/v1/update_price', data)
      .then(function (res) {
        //  console.log(res);
        return callback(res.data);       
      })
      .catch(function (error) {
        console.log(error);
      });
};


function get_customer_price(cid,callback){    
  axios.post('/wp-json/cargo/v1/get_price', cid)
    .then(function (res) {
     //  console.log(res);
      return callback(res.data);       
    })
    .catch(function (error) {
      console.log(error);
    });
};









  

export { update_price,get_customer_price}
