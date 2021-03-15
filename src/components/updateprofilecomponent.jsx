import React , { useEffect }from "react";
import { Container,Segment} from 'semantic-ui-react';
import Updateprofilep from "../pages/updateprofile";
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import "../components/css/profile.css";
import Faker from "faker";
import {connect} from "react-redux";
import {UserDataAction} from "../actions/user";
let imgsrc=Faker.image.nature();

const Updateprofile=(props)=>
{
    useEffect(()=>{
       props.UserDataAction();
    },[])
    if(!props.user){return null}
    return(
        <>
        <HeaderComponent/>
        <Container fluid>
        <Segment placeholder className="profilebg" style={{background: `url(${imgsrc})`}}>
            <Segment placeholder className="bgcolor"></Segment>
        </Segment>
        </Container>
        <Container>
            <Updateprofilep udata={props.user} {...props}/>
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps=(state)=>
{
  //console.log(state);
  return{user:state.login.currentuser}
}

export default connect(mapStateToProps,{UserDataAction})(Updateprofile);