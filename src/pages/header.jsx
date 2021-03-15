import React,{ Component } from "react";
import { Menu,Container,Label,Icon, Header,Image,Dropdown} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import "../pages/css/header.css";
import {connect} from "react-redux";
import {UserDataAction,LogoutAction} from "../actions/user";
import {UserCartAction} from "../actions/product";

class Headerp extends Component
{
  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  componentDidMount()
    { 
       let username=JSON.parse(localStorage.getItem('currentuser'));
       if(username)
       {
          this.props.UserDataAction();
       }
       //this.props.UserCartAction();
    }
    
render()
{
  let data= undefined !== this.props.ucart && this.props.ucart.length > 0 ? this.props.ucart.length : 0
  /*let user=JSON.parse(localStorage.getItem('persist:root'));
  let d=JSON.parse(user.usercart);
  let cartcount=parseInt(d.data.length);*/
    const { activeItem } = this.state;
    return(
        <Menu stackable>
        <Container>
        <Menu.Item>
          <img src='https://react.semantic-ui.com/logo.png' as={Link} to="/home" />
        </Menu.Item>

        <Menu.Item
          name='home'
          active={activeItem === 'home'}
          onClick={this.handleItemClick}
          as={Link} to="/home"
        >
            <Icon name='home' />
          Home
        </Menu.Item>

        <Menu.Item
          name='products'
          active={activeItem === 'products'}
          onClick={this.handleItemClick}
          as={Link} to="/products"
        >
            <Icon name='shopping basket' />
          Products
        </Menu.Item>

        <Menu.Menu position='right'>
        {
          this.props.user ?
          <>

        <Menu.Item
          name='cart'
          active={activeItem === 'cart'}
          onClick={this.handleItemClick}
          as={Link} to="/cart"
        >
            <Icon name='shopping cart' />
          Cart
          <Label>
            {data}
            </Label>
        </Menu.Item>

          <Dropdown item text="Setting" >
            <Dropdown.Menu>
              {
                this.props.user.isAdmin === true ? 
                <Dropdown.Item as={Link} to="/dashboard"><Icon name='dashboard' /> 
              Dashboard</Dropdown.Item>:""
              }
              
              <Dropdown.Item as={Link} to="/profile"><Icon name='user circle' />
              Profile</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
          <Menu.Item>
            <Header as='h4' style={{color:"white"}}>
              <Image circular src={this.props.user.profilepic} size='large' style={{width:"35px",height:"35px" }}/> Welcome, {this.props.user.firstname.charAt(0).toUpperCase() + this.props.user.firstname.slice(1)} {this.props.user.lastname.charAt(0).toUpperCase()+ this.props.user.lastname.slice(1)}
            </Header>
            </Menu.Item>
            <Menu.Item
          name='logout'
          onClick={()=>this.props.LogoutAction()}
          >
        <Icon name='sign-out' />
        LogOut
          </Menu.Item>
            
          
          </>
        :<>
          <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
          as={Link} to="/signup"
        >
          <Icon name='signup' />
          Sign Up
          </Menu.Item>

          <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
          as={Link} to="/login"
          >
          <Icon name='sign-in' />
          LogIn
          </Menu.Item>
          </>
        }

        </Menu.Menu>
        </Container>
      </Menu>
    )
}
}

const mapStateToProps=(state)=>
{
  //console.log(state);
  return{user:state.login.currentuser,ucart:state.usercart.data}
}

export default connect(mapStateToProps,{UserDataAction,UserCartAction,LogoutAction})(Headerp);