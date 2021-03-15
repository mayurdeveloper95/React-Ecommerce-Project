import React, {useState} from "react";
import { Table,Header,Image } from 'semantic-ui-react'
import {Link} from "react-router-dom";
import {connect} from "react-redux";
const Checkoutp=(props)=>
{
    const [shipping, setshipping] = useState(0);

    const formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value).replace(/^(\D+)/, '$1 ');
    }

    const calculateGst=()=>
    {
      return props.total+(props.total * 0.02)-props.total;
    }

    let user=JSON.parse(localStorage.getItem('persist:root'));
    let d=JSON.parse(user.usercart);
    //console.log(d);
    let tot=formatCurrency(Math.round(
        props.total > 5000 ? 
        50+props.total+calculateGst()+calculateGst():
        shipping+props.total+calculateGst()+calculateGst()
    ));
    localStorage.setItem('total',JSON.stringify(tot));


    return(
        <Table stackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell><Header size='medium'>Your Order</Header></Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
            <Table.HeaderCell><Header size='medium' color='blue' as={Link} to="/cart">Edit Cart</Header></Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
            {
                d.data?d.data.map(item=>(
                    <Table.Row>
                        <Table.Cell><Image src={item.productId.imagepic} style={{width:"50px",height:"50px"}} alt={item.productId.name}/></Table.Cell>
                        <Table.Cell><Header as='h5' style={{marginBottom:"10px"}}>{item.productId.pname}</Header>
                        <h5 style={{marginTop:"0px"}}>Quantity : {item.quantity} x {item.productId.offerPrice === 0 ?
                            formatCurrency(item.productId.price):
                            formatCurrency(item.productId.offerPrice)}/-</h5>
                        </Table.Cell>
                        <Table.Cell >
                        {
                            item.productId.offerPrice === 0?
                            formatCurrency(item.productId.price*item.quantity):
                            formatCurrency(item.productId.offerPrice*item.quantity)
                        }
                    </Table.Cell>
                    </Table.Row>
                )):null
            }

            <Table.Row>
                <Table.Cell><Header as='h5'>SUBTOTAL</Header></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell ><Header as='h5'>{formatCurrency(props.total)}</Header></Table.Cell>
            </Table.Row>

            <Table.Row>
                <Table.Cell><Header as='h5'>SHIPPING</Header></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell><Header as='h5'>
                    {
                         props.total> 5000 ? formatCurrency(50) :formatCurrency(shipping)
                    }</Header></Table.Cell>
            </Table.Row>

            <Table.Row>
                <Table.Cell><Header as='h5'>CGST (3%)</Header></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell><Header as='h5'>{formatCurrency(calculateGst())}</Header></Table.Cell>
            </Table.Row>

            <Table.Row>
                <Table.Cell><Header as='h5'>SGST (3%)</Header></Table.Cell>
                <Table.Cell></Table.Cell>
                <Table.Cell><Header as='h5'>{formatCurrency(calculateGst())}</Header></Table.Cell>
            </Table.Row>
        </Table.Body>
          
        <Table.Footer >
            <Table.Row>
                <Table.HeaderCell><Header as='h3'>Total</Header></Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
                <Table.HeaderCell><Header as='h3'>{
                        tot
                        }</Header></Table.HeaderCell>
            </Table.Row>
        </Table.Footer>

      </Table>
    )
};

const mapStateToProps=(state)=>
{
return{
    total:state.usercart.data.reduce((acc,nextstate)=>
    nextstate.productId.offerPrice?
    (acc + nextstate.productId.offerPrice * nextstate.quantity):
    (acc + nextstate.productId.price * nextstate.quantity),0)
};
}

export default connect(mapStateToProps)(Checkoutp);