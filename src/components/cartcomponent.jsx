import React, {useEffect} from "react";
import { Container,Header,Icon,Divider } from 'semantic-ui-react';
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import {connect} from "react-redux";
import {UserCartAction} from "../actions/product";
import Cartp from "../pages/cart";
const Cart=(props)=>
{
    useEffect(() => {
        props.UserCartAction();
    },[]);
    if(!props.ucart){return null}
    return(
        <>
        <HeaderComponent/>
        <Container style={{paddingBottom:"120px"}}>
            {
                props.ucart.length===0?<Header as='h1' style={{marginTop:"20px"}} textAlign="center">Empty Cart</Header>:
                <>
                <Header as='h1' style={{marginTop:"20px"}}><Icon name='add to cart' />Cart</Header>
                <Divider/>
                <Cartp cartdata={props.ucart}/>
                </>
            }
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps=(state)=>
{
    //console.log(state);
    return{ucart:state.usercart.data}
}

export default connect(mapStateToProps,{UserCartAction})(Cart);