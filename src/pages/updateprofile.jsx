import React, { Component } from "react";
import { Header, Table, Button, Form,TextArea } from 'semantic-ui-react';
import {connect} from "react-redux";
import {UpdateUserAction} from "../actions/user";
import {Link} from "react-router-dom";

class Updateprofilep extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            firstname:this.props.items.firstname,
            lastname:this.props.items.lastname,
            address:this.props.items.address,
            profilepic:this.props.items.profilepic,
        }        
    };

    handleFormData=(e)=>{
        e.preventDefault();
        let data={
            firstname:this.state.firstname,
            lastname:this.state.lastname,
            address:this.state.address,
            profilepic:this.state.profilepic
        }
        let d =new FormData();
        d.append('firstname',data.firstname);
        d.append('lastname',data.lastname);
        d.append('address',data.address);
        d.append('profilepic',data.profilepic)

        this.props.UpdateUserAction(this.props.match.params.id,d);
        setTimeout(()=>{
            this.props.history.push("/profile");
        window.location.reload();
            window.location.reload();
            },1000)
        
    }

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

    fileInputRef = React.createRef();

    fileChange = e => {
        this.setState({ profilepic: e.target.files[0] });
      };

    render()
    {
        return(
        <>
            <Header as='h2' style={{marginTop:"30px"}}>Updated Information</Header>
            <form className="ui form" onSubmit={this.handleFormData}>
            <Table basic='very' style={{marginTop:"30px",paddingBottom:"100px"}}>
                <Table.Body>
                <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>First Name</Table.Cell>
                        <Table.Cell><Form.Input 
                        placeholder='First name'
                        name="firstname"
                        value={this.state.firstname}
                        onChange={this.handleInput}
                        /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>LastName</Table.Cell>
                        <Table.Cell><Form.Input 
                        placeholder='Last name'
                        name="lastname"
                        value={this.state.lastname}
                        onChange={this.handleInput}
                        /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>Address</Table.Cell>
                        <Table.Cell><TextArea 
                        placeholder='Enter Address'
                        name="address"
                        value={this.state.address}
                        onChange={this.handleInput}
                        /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell style={{fontWeight:"600"}}>Profile Pic</Table.Cell>
                        <Table.Cell>
                            {/*
                        <Button
                  content="Choose File"
                  labelPosition="left"
                  icon="file"
                  display="none"
                  onClick={() => this.fileInputRef.current.click()}
                            />*/}
                <input
                  ref={this.fileInputRef}
                  type="file"
                  icon="file"

                  onChange={this.fileChange}
                />
                
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>

                    <Table.Cell><Button primary>Update</Button>
                    <Button primary content='Back' icon='left arrow' labelPosition='left' as={Link} to="/profile"/>
                    </Table.Cell>
                    
            </Table>
            </form>
        </>
    )
        }
}

const mapStateToProps=(state,ownprops)=>{
    //console.log(state,ownprops);
    return {items:state.login.currentuser,ownprops:ownprops.match.params.id};  
    }

export default connect(mapStateToProps,{UpdateUserAction})(Updateprofilep);