import React ,{useEffect} from "react";
import {Container,Breadcrumb,Grid} from 'semantic-ui-react';
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import {ProductsByIdAction} from "../actions/product";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Productdetailsp from "../pages/productdetails";
const Productdetails =(props)=>
{
    useEffect(() => {
        props.ProductsByIdAction(props.match.params.id);
    }, []);
   
    return(
        <>
        <HeaderComponent/>
        <Container style={{paddingBottom:"100px"}}>
        <Grid>
            <Grid.Row>
                <Breadcrumb style={{paddingTop:"20px",paddingBottom:"10px"}}>
                <Breadcrumb.Section as={Link} to="/products">Products</Breadcrumb.Section>
                <Breadcrumb.Divider>/</Breadcrumb.Divider>
                <Breadcrumb.Section active>{props.pdetails.pname}</Breadcrumb.Section>
                </Breadcrumb>
            </Grid.Row>
            <Grid.Row>
                <Productdetailsp data={props.pdetails}/>
            </Grid.Row>
        </Grid>
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps=(state)=>{
    //console.log(state);
    return {pdetails:state.productbyid};
}

export default connect (mapStateToProps,{ProductsByIdAction})(Productdetails);