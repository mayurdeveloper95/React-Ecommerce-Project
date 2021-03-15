import React from "react";
import { Menu,Container,Header} from 'semantic-ui-react';
let d=new Date();
let y=d.getFullYear();

const Footer=()=>
{
    return(
        <>
        <Menu stackable fixed="bottom" style={{backgroundColor:"blueviolet",minHeight:"70px"}}>
        <Container>
            <Header as='h4' icon textAlign='center' style={{margin:"auto"}}>
            <Header.Content style={{color:"white",fontFamily: "Montserrat,sans-serif"}}>Coyright © {y} Developed by Mayur | All Rights Reserved.</Header.Content>
            </Header>
        </Container>
        </Menu>
        </>
    )
}

export default Footer;