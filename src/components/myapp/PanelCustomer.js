import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,  
         Button
        } from 'react-bootstrap';


        import  ModelCustomerCreate from './modal/ModelCustomerCreate';
        import  ModelCustomerEdit from './modal/ModelProductEdit';
        
        import { get_all_customer, del_customer } from './rest/func_rest_customer';
        


import DataTable, { createTheme } from 'react-data-table-component';


createTheme('solarized', {
    text: {
      primary: '#268bd2',
      secondary: '#2aa198',
    },
    background: {
      default: '#002b36',
    },
    context: {
      background: '#cb4b16',
      text: '#FFFFFF',
    },
    divider: {
      default: '#073642',
    },
    action: {
      button: 'rgba(0,0,0,.54)',
      hover: 'rgba(0,0,0,.08)',
      disabled: 'rgba(0,0,0,.12)',
    },
  });

  const handleChange = (state) => {
    // You can use setState or dispatch with something like Redux so we can use the retrieved data
    console.log('Selected Rows: ', state.selectedRows);
  };




class PanelCustomer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: [],
          checked:[]
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/get_customers', {
        page: 1,
        post_per_page: 99900
      })
      .then(function (res) {
        console.log(res);
        me.setState({data:res.data});
      })
      .catch(function (error) {
        console.log(error);
      });
    }





    fetch_all = () => {
      let me = this;
      get_all_ctype(function(resx){
        me.setState({
          data:resx
        });
      });
    }


    toggleRow = (cid) => {

      let all_checked = [];
      if(this.state.checked.includes(cid.id)){        
        all_checked = [...this.state.checked].filter(function(value){ 
          return value != cid.id;
         });
        
      }else{
        all_checked = [...this.state.checked,cid.id];
      };

      console.log( all_checked);
      this.setState({checked:all_checked});
    }




    deleteData = () =>{
      let checked = [...this.state.checked];
      if(window.confirm('確定刪除')){
        console.log(checked );
        let me = this;
        del_ptype(checked,function(obj){         
         
          get_all_Customer(function(resx){
            me.setState({data:resx});
          });
        });
      }
    }



   /*  private function */
        removeByValue = (val, arr) =>{
          for( var i = 0; i < arr.length; i++){                                    
            if ( arr[i] == val) { 
                arr.splice(i, 1); 
                i--; 
            }
          }     
          return  arr;
        }
















    render() {

        const {data,checked} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        console.log(data);

        const columns = [
          {
            cell: (cid) => <input
            type="checkbox"
            className="checkbox"
            checked={this.state.checked.includes(cid.id)}
            onChange={(e) => this.toggleRow(cid)}
          />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            name: '客戶編號',
            selector: 'customer_id',
            sortable: true,
          },
          {
            name: '名稱',
            selector: 'cname',
            sortable: true,            
          },
          {
            name: '聯絡人',
            selector: 'contact',
            sortable: true,            
          },
          {
            name: '聯絡人職稱',
            selector: 'contact_job',
            sortable: true,
          },
          {
            name: '聯絡人電話1',
            selector: 'contact_tel1',     
          },
          {
            name: '聯絡人電話2',
            selector: 'contact_tel2',
          },
          {
            name: '聯絡人電話3',
            selector: 'contact_tel3',
          },
          {
            name: '聯絡人手機',
            selector: 'contact_mobile',
          },
          {
            name: '聯絡人傳真',
            selector: 'contact_fax',
          },
          {
            name: '聯絡人Email',
            selector: 'contact_email',
          },

          {
            cell: (pid) => <ModelCustomerEdit name="Edit"  pdata={pid}   fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          }

        ];




        return (

            <Container id="aloha_app" >

                <div className="small_nav">
                    <ModelCustomerCreate name="Add"    fetch_all={this.fetch_all} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData} >DEL</Button>:''}
                </div>

                <Card>
                    <div className="card-body">

                    <DataTable
                        title="客戶"
                        columns={columns}
                        data={data}
                        pagination={true}
                        
                     
                        
                    />

                    </div> 
                    </Card>
            </Container>            
        )
    }
}

export default hot(module)(PanelCustomer);