import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Dropdown,
         Button
        } from 'react-bootstrap';

import  ModelDep from './modal/ModelDep';
import  ModelDepEdit from './modal/ModelDepEdit';


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


class PanelDep extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          data: []
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/get_dep', {
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





    editData = () =>{
        let me = this;
        axios.post('/wp-json/cargo/v1/get_single_dep', {
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
            cell: (data) => <input
            type="checkbox"
            className="checkbox"
           // checked={this.state.selected[original.firstName] === true}
           // onChange={() => this.toggleRow(original.firstName)}
          />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
          {
            name: '部門編號',
            selector: 'dep_id',
            sortable: true,
          },
          {
            name: '名稱',
            selector: 'dep_name',
            sortable: true,            
          },
          {
            cell: (data) => <ModelDepEdit name="Edit"/>,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },
        ];



        return (

            <Container id="aloha_app" >


            <div className="small_nav">
                <ModelDep name="Add" />  
                <Button >DEL</Button>
            </div>

                   <Card>                    
                      <div className="card-body">                   

                        <DataTable
                            title="部門"
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

export default hot(module)(PanelDep);