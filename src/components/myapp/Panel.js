import React from "react";
import { hot } from "react-hot-loader";
import { 
        Container,
         Table
        } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.scss';        


class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <h3>xxss</h3>
                <Table striped bordered hover size="sm">
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
            </Container>            
        )
    }
}

export default hot(module)(Panel);