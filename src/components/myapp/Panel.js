import React from "react";
import { hot } from "react-hot-loader";
import { 
        Container,
         Table,
         Card
        } from 'react-bootstrap';



class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <Container id="aloha_app" >
                <Card>
                    <div className="card-body">

                        <h3>客戶管理</h3>
                        <Table  hover size="sm">
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Username</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                                </tr>
                                <tr>
                                <td>2</td>
                                <td>Jacob</td>
                                <td>Thornton</td>
                                <td>@fat</td>
                                </tr>
                                <tr>
                                <td>3</td>
                                <td colSpan="2">Larry the Bird</td>
                                <td>@twitter</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div> 
                    </Card>
            </Container>            
        )
    }
}

export default hot(module)(Panel);