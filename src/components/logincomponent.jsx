import React from "react";
import { Container,Grid,Image, Header} from 'semantic-ui-react';
import login from "../images/signup-1.png";
import Loginp from "../pages/login";
import "./css/loginc.css";
const Login=()=>
{
    return(
        <>
        <Container fluid>
            <Grid verticalAlign='middle' className="mainbg">
                <Grid.Row style={{padding:"0px"}}>
                    <Grid.Column width={7} className="leftbg" verticalAlign='middle'>
                        <Container className="secondbg">
                            <div className="login-left">
                            <Header as='h1' textAlign='center'>Login</Header>
                                <Loginp/>
                            </div>
                        </Container>
                    </Grid.Column>

                    <Grid.Column width={9}>
                        <Image src={login} centered alt="login" style={{width:"70%"}}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        </>
    )
}

export default Login;