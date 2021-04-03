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



class PanelProductType extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/product_type', {
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
            name: '類別編號',
            selector: 'type_id',
            sortable: true,
          },
          {
            name: '類別名稱',
            selector: 'type_name',
            sortable: true,            
          },
          {
            name: '類別英文名稱',
            selector: 'type_eng_name',
            sortable: true,            
          },
          {
            name: '產品類別',
            selector: 'type_name',
            sortable: true,
          },
          {
            name: '存貨科目',
            selector: 'in_account',
            sortable: true,
            right: true,
          },
          {
            name: '進貨科目',
            selector: 'stock_account',
            sortable: true,            
          },
          {
            name: '進貨退出',
            selector: 'out_account',
            sortable: true,           
          }          
        ];


        return (

            <Container id="aloha_app" >
                <Card>
                    <div className="card-body">

                    <DataTable
                        title="產品資訊"
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

export default hot(module)(PanelProductType);