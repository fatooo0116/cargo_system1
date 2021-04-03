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


class PanelStaff extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/get_staff', {
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
            name: '員工編號',
            selector: 'staff_id',
            sortable: true,
          },
          {
            name: '部門編號',
            selector: 'dep_id',
            sortable: true,            
          },
          {
            name: '姓名',
            selector: 'staff_name',
            sortable: true,            
          },
          {
            name: '英文姓名',
            selector: 'staff_eng_name',
            sortable: true,
          }
          
        ];


        return (

            <Container id="aloha_app" >
                <Card>
                    <div className="card-body">

                    <DataTable
                        title="人員資料"
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

export default hot(module)(PanelStaff);