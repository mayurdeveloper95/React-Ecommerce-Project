import React from "react";
import { Container,Grid,Image, Header} from 'semantic-ui-react';
import register from "../images/E-commerce-cartoon-illustration-vector.jpg";
import Signp from "../pages/signup";
import "./css/loginc.css";
const Signup=()=>
{
    return(
        <>
        <Container fluid>
            <Grid verticalAlign='middle' className="mainbg">
                <Grid.Row style={{padding:"0px"}}>
                    <Grid.Column width={7} className="leftbg" verticalAlign='middle'>
                        <Container className="secondbg">
                            <div className="login-left">
                            <Header as='h1' textAlign='center'>Signup</Header>
                                <Signp/>
                            </div>
                        </Container>
                    </Grid.Column>

                    <Grid.Column width={9}>
                        <Image src={register} size='big' centered alt="login"/>                        
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        </>
    )
}

export default Signup;