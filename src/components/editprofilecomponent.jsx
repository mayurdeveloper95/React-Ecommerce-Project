import React , { useEffect }from "react";
import { Container,Segment,Tab,Header,Image,Table} from 'semantic-ui-react';
import Editprofilep from "../pages/editprofile";
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import "../components/css/profile.css";
import Faker from "faker";
import {connect} from "react-redux";
import {UserDataAction} from "../actions/user";
import {UserCheckoutCartAction,CheckoutCartAction} from "../actions/product";
let imgsrc=Faker.image.nature();

const Editprofile=(props)=>
{
    console.log("data",props);
    useEffect(()=>{
        props.UserDataAction();
        props.UserCheckoutCartAction();   
    },[])
    if(!props.checkout){return null;}
    //let t=JSON.parse(localStorage.getItem('total'));
    const panes = [
       { menuItem: { icon: 'cart', key: 'User Information', content: 'User Information'}, render: () => <Tab.Pane><Editprofilep udata={props.user}{...props}/></Tab.Pane> },
       { menuItem: { icon: 'shopping basket', key: 'My Orders', content: 'My Orders'}, render: () => <Tab.Pane>
           <>
           <Header as='h3'>My Orders</Header>
           <Table celled style={{marginTop:"30px"}}>
               <Table.Header>
                 <Table.Row>
                   <Table.HeaderCell style={{fontWeight:"600"}}>#Order ID</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Address</Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Payment </Table.HeaderCell>
                   <Table.HeaderCell style={{fontWeight:"600"}}>Paid</Table.HeaderCell>
                   
                   <Table.HeaderCell style={{fontWeight:"600"}}>Delivered</Table.HeaderCell>
                 </Table.Row>
               </Table.Header>
               {<Table.Body>
                   {
                       props.checkout.message ? <h2>{props.checkout.message}</h2> :
                        props.checkout.map(data=>(
                           <Table.Row key={data._id}>
                           <Table.Cell>{data._id}</Table.Cell>
                           <Table.Cell>{data.address}</Table.Cell>
                           <Table.Cell>{data.paymentMethod}</Table.Cell>
                           <Table.Cell>{data.isPaid===true? "Amount Paid": "Payment Pending"}</Table.Cell>
                           
                           <Table.Cell>{data.isDelivered ===true? "Order Recived" :"Processing"}</Table.Cell>
                       </Table.Row>
                       ))
                   } 

                </Table.Body>}
           </Table>
           </>
       </Tab.Pane> },
     ]

    if(!props.user){return null};
    return(
        <>
        <HeaderComponent/>
        <Container fluid>
        <Segment placeholder className="profilebg" style={{background: `url(${imgsrc})`}}>
            <Segment placeholder className="bgcolor"></Segment>
        </Segment>
        </Container>
        <Container>
        <Header as='h2' style={{marginTop:"-80px",position:"relative",color: "white"}}>
            <Image circular src={props.user.profilepic} style={{width:"120px",height:"120px"}}/>
            {props.user.firstname.charAt(0).toUpperCase() + props.user.firstname.slice(1)} {props.user.lastname.charAt(0).toUpperCase()+ props.user.lastname.slice(1)}
        </Header>
        <Tab
        menu={{ fluid: true, vertical: true }}
        menuPosition='left'
        panes={panes}
        />
        </Container>
        <Footer/>
        </>
    )
}

const mapStateToProps=(state)=>
{
  console.log(state);
  return{user:state.login.currentuser,checkout:state.usercheckout}
}

export default connect(mapStateToProps,{UserDataAction,UserCheckoutCartAction,CheckoutCartAction})(Editprofile);