import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card
        } from 'react-bootstrap';


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



class PanelProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
    }

    componentDidMount() {

      let me = this;

      axios.post('/wp-json/cargo/v1/get_products', {
        page: 1,
        post_per_page: 10
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
            name: '產品編號',
            selector: 'product_id',
            sortable: true,
          },
          {
            name: '產品類別',
            selector: 'type_name',
            sortable: true,
          },
          {
            name: '單位編號',
            selector: 'unit_sn',
            sortable: true,
            right: true,
          },
          {
            name: '計量編號',
            selector: 'unit_sn',
            sortable: true,
            right: true,
          },
        ];


        return (

            <Container id="aloha_app" >
                <Card>
                    <div className="card-body">

                    <DataTable
                        title="客戶管理"
                        columns={columns}
                        data={data}
                    />

                    </div> 
                    </Card>
            </Container>            
        )
    }
}

export default hot(module)(PanelProduct);