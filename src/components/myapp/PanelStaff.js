import React from "react";
import { hot } from "react-hot-loader";
import axios from 'axios';
import { 
        Container,       
         Card,
         Button
        } from 'react-bootstrap';

import  ModelStaffCreate from './modal/ModelStaffCreate';
import  ModelStaffEdit from './modal/ModelStaffEdit';

import { get_all_staff, del_staff } from './rest/func_reststaff';

import { get_all_dep } from './rest/func_restdep';

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
          data: [],
          checked:[],
          all_dep:[],
          toggledClearRows:false
        }
    }

    componentDidMount() {

      let me = this;
      axios.post('/wp-json/cargo/v1/get_staff', {
        page: 1,
        post_per_page: 99900
      })
      .then(function (res) {
       
        let mdata = res.data;
        
        get_all_dep(function(all_dep){
        
          mdata.forEach(function(item){           
            item['dep_name'] = all_dep.filter(function(itex){  return  itex.dep_id==item.dep_id })[0].dep_name;         
          });

          console.log(mdata);

          me.setState({
            data:mdata,
            all_dep:all_dep
          });
        });

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






    deleteData = () =>{
      let checked = [...this.state.checked];
      if(window.confirm('確定刪除')){
        console.log(checked );
        let me = this;
        del_staff(checked,function(obj){         
         
          get_all_staff(function(resx){
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




        handleChange = (state) => {
          // You can use setState or dispatch with something like Redux so we can use the retrieved data
          this.setState({checked:state.selectedRows})
        };

      handleClearRows = () => {
       
          this.setState({ toggledClearRows: !this.state.toggledClearRows})
        }

      




    render() {

        const {data,checked,all_dep} = this.state;
        // const data = [{ id: 1, title: 'Conan the Barbarian', year: '1982' }];

      //  console.log(data);




       // console.log(data);

        const columns = [
          {
            cell: (pid) => <ModelStaffEdit name="Edit"  pdata={pid} all_dep={all_dep}  fetch_all={this.fetch_all}  />,
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
          },

          {
            name: '員工編號',
            selector: 'staff_id',
            sortable: true,
          },
          {
            name: '部門編號',           
            selector: 'dep_name',
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
          },

          
        ];


        return (

            <Container id="aloha_app" >

              <div className="small_nav">
                    <ModelStaffCreate name="Add"    fetch_all={this.fetch_all}   all_dep={all_dep} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData}  >DEL</Button>:''}
                </div>


                <Card>
                    <div className="card-body">

                    <DataTable
                        title="人員資料"
                        columns={columns}
                        data={data}
                        pagination={true}
                        paginationPerPage="100"
                        paginationRowsPerPageOptions={["30","50","100"]}    

                        selectableRows={true}
                        selectableRowsVisibleOnly={true}
                        onSelectedRowsChange={this.handleChange}
                        clearSelectedRows={this.toggledClearRows}                        
                    />

                    </div> 
                    </Card>

                    <div className="small_nav">
                    <ModelStaffCreate name="Add"    fetch_all={this.fetch_all}   all_dep={all_dep} />  
                    {( checked.length >0 )? <Button onClick={this.deleteData}  >DEL</Button>:''}
                </div>                    
            </Container>            
        )
    }
}

export default hot(module)(PanelStaff);