import React ,{useState,useEffect} from "react";
import {Grid,Image,Header,Divider,Label,Button, Icon,Tab,List} from 'semantic-ui-react';
import {connect} from "react-redux";
import {AddCartAction} from "../actions/product";
import {UserCartAction} from "../actions/product";
import "./css/productdetails.css"
const Productdetailsp=(props)=>
{
    const [quantity, setquantity] = useState(1);

    const formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value).replace(/^(\D+)/, '$1 ');
    }

    const addCart=(productId)=>
    {
        props.AddCartAction(productId,quantity);
        setTimeout(()=>{
            alert("Product added to cart");
            //window.location.reload();
            props.UserCartAction();
            },1000);
        
    }
    if(!props.data)
    {
        return null;
    }
    const panes = [
        { menuItem: 'Product Details', render: () => <Tab.Pane>
            <List bulleted className="tabdata">
                <List.Item><b>Product Name :</b> {props.data.pname}</List.Item>
                {
                    props.data.dimensions ?
                <List.Item><b>Product Dimensions (lxbxh) :</b> {props.data.dimensions}</List.Item>:
                null 
                } 
                {
                    props.data.weight?
                <List.Item><b>Product Weight :</b> {props.data.weight}/kg</List.Item> :
                null
                }  
                <List.Item><b>Product Details :</b> {props.data.description}</List.Item>                 
            </List>
        </Tab.Pane> },
        { menuItem: 'Manufacturing Details', render: () => <Tab.Pane>
            <List bulleted className="tabdata">
                <List.Item><b>Manufacturer Name :</b> {props.data.manufacturer}</List.Item>
                <List.Item><b>Net Quantity :</b> {props.data.netquantity}</List.Item>                   
            </List>
        </Tab.Pane> },
      ]

    return(
        <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={8} textAlign="center">
                        <Image src={props.data.imagepic} alt={props.data.pname} style={{width:"60%"}} centered />
                    </Grid.Column>
                    <Grid.Column width={8}>
                        <div>
                            <Header as='h2'>{props.data.pname}</Header>
                            <Header sub style={{lineHeight:"26px",fontSize:"14px"}}>{props.data.description}</Header>
                            <Divider />
                            <div className="price" style={{display:"flex",alignItems:"center"}}>
                                <Label color='blue' tag size="big" style={{textDecoration:props.data.offerPrice < 1 ?"":
                                "line-through"}}>
                                {formatCurrency(props.data.price)}</Label>
                                {
                                props.data.offerPrice < 1 ?"":<h3 className="ofprice">{formatCurrency(props.data.offerPrice)}</h3>
                                }
                            </div>
                            <Grid columns={3} style={{marginTop:"20px"}}>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Header as='h6'>
                                            <Icon name='money bill alternate outline' />
                                            <Header.Content>Cash on Delivery</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header as='h6'>
                                            <Icon name='redo' />
                                            <Header.Content>30 Day Return Policy</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header as='h6'>
                                            <Icon name='truck' />
                                            <Header.Content>Free Home Delivery</Header.Content>
                                        </Header>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                            <div className="addtocart" style={{marginTop:"30px"}}>
                                {
                                    props.data.stocks > 0?
                                    <Button icon labelPosition='left' color='violet' onClick={()=>addCart(props.data._id,setquantity)}>
                                    <Icon name='shopping cart' />Add to Cart</Button>:
                                    <Header as='h3' style={{color:"red"}}>Product out of stock</Header>
                                }
                            </div>
                        </div>
                    </Grid.Column>
                </Grid.Row>
                <Divider />
                <Grid.Row>
                    <Tab
                    menu={{ pointing: false }}
                    menuPosition='left'
                    panes={panes}
                    />
                    <Divider />
                </Grid.Row>
            </Grid>
        </>
    )
}

export default connect(null,{AddCartAction,UserCartAction})(Productdetailsp);