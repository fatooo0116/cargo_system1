import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card
        } from 'react-bootstrap';


import DataTable, { createTheme } from 'react-data-table-component';
import { 

  Button,
  
 } from 'react-bootstrap';

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
          data: []
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





    render() {

        const {data} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

        console.log(data);

        const columns = [
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
            name: "Action",
            button: true,
            sortable: false,
            cell: () => <Button size="sm" >edit</Button>
          }

        ];




        return (

            <Container id="aloha_app" >
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