import React from "react";
import { Container,Grid,Image, Header} from 'semantic-ui-react';
import login from "../images/forgot-password.jpg";
import ResetPassword from "../pages/resetpassword";
import "./css/loginc.css";
const Resetpassword=()=>
{
    return(
        <>
        <Container fluid>
            <Grid verticalAlign='middle' className="mainbg">
                <Grid.Row style={{padding:"0px"}}>
                    <Grid.Column width={7} className="leftbg" verticalAlign='middle'>
                        <Container className="secondbg">
                            <div className="login-left">
                            <Header as='h1' textAlign='center'>Reset Password</Header>
                                <ResetPassword/>
                            </div>
                        </Container>
                    </Grid.Column>

                    <Grid.Column width={9}>
                        <Image src={login} size='big' centered alt="login"/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
        </>
    )
}

export default Resetpassword;