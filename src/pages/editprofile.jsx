import React, { Component } from "react";
import { Header,Image, Table, Button} from 'semantic-ui-react';

class Editprofilep extends Component
{
    editUpdate=(id)=>{
        this.props.history.push(`/updateprofile/${id}`);
    }
render()
{
        return(
        <>
            <Header as='h3'>Detailed Information</Header>
            <Table basic='very' style={{marginTop:"30px"}}>
                <Table.Body>
                <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>First Name</Table.Cell>
                        <Table.Cell>{this.props.udata.firstname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>LastName</Table.Cell>
                        <Table.Cell>{this.props.udata.lastname}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>Email Id</Table.Cell>
                        <Table.Cell>{this.props.udata.email}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>Address</Table.Cell>
                        <Table.Cell>{this.props.udata.address}</Table.Cell>
                    </Table.Row>
                </Table.Body>
                
                    <Table.Cell style={{    padding:"15px 0px"}}><Button primary onClick={()=>this.editUpdate(this.props.udata._id)}>Edit</Button></Table.Cell>
                
            </Table>
        </>
    )
        }
}

export default Editprofilep;