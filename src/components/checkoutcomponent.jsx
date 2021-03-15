import React, {Component} from "react";
import { Container,Header,Icon,Divider,Grid,Form ,Button} from 'semantic-ui-react';
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import Checkoutp from "../pages/checkout";
import SimpleReactValidator from "simple-react-validator";
import {CheckoutCartAction} from "../actions/product";
import {connect} from "react-redux";
import {history} from "../shared/helper/history";
import Loading from "../components/loader";

class Checkout extends Component
{
  constructor(props)
    {
        super(props);
        //let t=localStorage.getItem('total');
        this.state={
                address:"",
                city:"",
                postalcode:"",
                country:"",
                paymentMethod:"cod",
                isPaid:true,
                isDelivered:true
                //total:t
            };
        this.validator = new SimpleReactValidator({autoForceUpdate:this});
    }

    handleFormSubmit = e => {
        e.preventDefault();
        if (this.validator.allValid()) {
          let data = {
                address:this.state.address,
                city:this.state.city,
                postalcode:this.state.postalcode,
                country:this.state.country,
                paymentMethod:this.state.paymentMethod,
                isPaid:this.state.isPaid,
                isDelivered:this.state.isDelivered
                //total:this.state.total
          };
          //console.log(data);
          this.props.CheckoutCartAction(data);
          setTimeout(() => {
            alert(this.props.order.message);
            history.push("/profile");
            window.location.reload();
          }, 2500);
          this.toggleLoading();
        } 
        else {
          this.forceUpdate();
          this.validator.showMessages();
        }
      };

      handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

      toggleLoading = () => {
        this.setState({ loading: true });

        setTimeout(() => {
          this.setState({ loading: false });
        }, 2000);
      }

      handleChange= e =>{
        this.setState({paymentMethod:!this.state.paymentMethod});
    }

render()
{
  const { loading } = this.state;
    return(
        <>
        <HeaderComponent/>
        <Container style={{paddingBottom:"120px",marginTop:"20px"}}>
        <Header as='h1' style={{marginTop:"20px"}} ><Icon name='paypal card' />Checkout</Header>
        <Divider/>
        <Grid>
            <Grid.Row>
                <Grid.Column width={9}>
                <Header as='h3'>Shipping Address</Header>
                <Form onSubmit={this.handleFormSubmit}>
                    <Form.Field>
                        <Form.TextArea label='Address' placeholder='Enter your Address' 
                        name="address" required value={this.state.address} onChange={this.handleInput}/>
                        {
                            this.validator.message('address',this.state.address,'required|min:5|string')
                        } 
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='City' placeholder='Enter City Name' 
                        name="city" required value={this.state.city} onChange={this.handleInput}/>
                        
                        <Form.Input fluid label='Zip Code' placeholder='Enter Zip code' 
                        name="postalcode" required value={this.state.postalcode} onChange={this.handleInput}/>
                        
                        <Form.Input fluid label='Country' placeholder='Enter Country Name' 
                        name="country" required value={this.state.country} onChange={this.handleInput}/>
                        
                    </Form.Group>
                    {
                            this.validator.message('city',this.state.city,'required|min:5|string')
                        } 
                        {
                            this.validator.message('postalcode',this.state.postalcode,'required|max:6|string')
                        } 
                        {
                            this.validator.message('country',this.state.postalcode,'required|string')
                        } 
                    <Divider/>
                <Header as='h3'>Payment Method</Header>
                <Form.Group inline>
                    <Form.Field inline>
                        <Form.Radio
                        label='COD(Cash On Delivery)' name="cod" value={this.state.paymentMethod}
                        onChange={this.handleChange}
                        defaultChecked={this.state.paymentMethod}
                        required/>
                    </Form.Field>
                </Form.Group>
                <Button icon labelPosition='left' style={{marginTop:"20px"}} color='violet' 
                onClick={this.handleFormSubmit} disabled={loading}>
                    <Icon name='truck' />
                  {loading && !this.props.order.error &&(<Loading style={{ marginRight: "5px" }}/>)}
                  {!loading && <span>Place Order</span>}
                </Button>
                </Form>
                </Grid.Column>
                <Grid.Column width={7}>
                <Checkoutp/>
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </Container>
        <Footer/>
        </>
    )
  }
};

const mapStateToProps=(state)=>
{
  //console.log(state);
  return ({order:state.checkoutcart});
}

export default connect(mapStateToProps,{CheckoutCartAction})(Checkout);