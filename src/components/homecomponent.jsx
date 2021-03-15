import React,{useEffect} from "react";
import { Container,Header,Divider,Grid,Icon,Segment} from 'semantic-ui-react';
import HeaderComponent from "../components/headercomponent";
import Footer from "../pages/footer";
import "./css/home.css";
import {TodayOfferAction,LatestProductAction} from "../actions/product";
import {connect} from "react-redux";
import Productp from "../pages/product";
const Home=(props)=>
{
    useEffect(() => {
        props.TodayOfferAction();
        props.LatestProductAction();
    }, []);

    return(
        <>
        <HeaderComponent/>
        <Container fluid>
            <div className="sale"></div>
        </Container>
        <Container style={{paddingBottom:"100px",paddingTop:"30px"}}>
        <Grid columns={3} style={{marginTop:"20px"}}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Segment textAlign='center' padded='very'>
                                        <Header as='h3'>
                                            <Icon name='money bill alternate outline' />
                                            <Header.Content>Cash on Delivery</Header.Content>
                                        </Header>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                    <Segment textAlign='center' padded='very'>
                                        <Header as='h3'>
                                            <Icon name='redo' />
                                            <Header.Content>30 Day Return Policy</Header.Content>
                                        </Header>
                                    </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                    <Segment textAlign='center' padded='very'>
                                        <Header as='h3'>
                                            <Icon name='truck' />
                                            <Header.Content>Free Home Delivery</Header.Content>
                                        </Header>
                                    </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>


            <Header as='h3'>Todays Offer</Header>
            <Divider />
        <Grid>
            <Grid.Row style={{marginTop:"20px"}}>
                    {
                        props.today?props.today.map((data)=>(
                            <>
                            <Grid.Column mobile={8} tablet={4} computer={4}>
                            <Productp pdata={data} {...props} />
                            </Grid.Column>
                            </>
                        )):
                        null
                    }     
            </Grid.Row>
        </Grid>
        <Header as='h3'>Latest Product</Header>
        <Divider />
        <Grid>
            <Grid.Row style={{marginTop:"20px"}}>
                    {
                        props.latest?props.latest.map((data)=>(
                            <>
                            <Grid.Column mobile={8} tablet={4} computer={4}>
                            <Productp pdata={data} {...props} />
                            </Grid.Column>
                            </>
                        )):
                        null
                    }     
            </Grid.Row>
        </Grid>

        </Container>
        <Footer/>
        </>
        
    )
}

const mapStateToProps=(state)=>{
   //console.log(state);
    return {today:state.todayoffer.t,latest:state.latest.l};
    }

export default connect(mapStateToProps,{TodayOfferAction,LatestProductAction})(Home);