import React ,{useState} from "react";
import { Label, Icon, Table,Image , Confirm} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {AddQuantityAction,RemoveQuantityAction,DeleteCartAction} from "../actions/product";
const Cartp=(props)=>
{
    const [state, setState] = useState({ open: false });
    const [quantity, setquantity] = useState(1);

    const formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value).replace(/^(\D+)/, '$1 ');
    }
    const formatDescription=(value)=>{
        if(!value){return null;}
        return value.substring(0,80)+"...";
    }
    //let user=localStorage.setItem('subtotal',props.total);    
/*
    const show = () => setState({ open: true })
    const handleConfirm = () => setState({ open: false })
    const handleCancel = () => setState({ open: false })
*/
    let {cartdata}=props;
    
    return(
        <>
        <Table celled compact definition>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell>Product Image</Table.HeaderCell>
                    <Table.HeaderCell>Product Name</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Product Quantity</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Product Price</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Action</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {
                cartdata?cartdata.map(data=>(
                <Table.Row key={data.productId._id}>
                    <Table.Cell style={{backgroundColor:"transparent"}}>
                        <Image src={data.productId.imagepic} style={{width:"100px",height:"100px"}} alt={data.productId.name}/>
                    </Table.Cell>
                    <Table.Cell>{formatDescription(data.productId.pname)}</Table.Cell>
                    <Table.Cell textAlign='center'>
                        <div className="quantity">
                            <span>
                                <Icon name='plus circle' size="big" color="violet" style={{cursor:"pointer"}} onClick={()=>props.AddQuantityAction(data.productId._id,quantity)}/>
                                <Label style={{backgroundColor:"transparent"}}>{data.quantity}</Label>
                                <Icon name='minus circle' size="big" color="violet" style={{cursor:"pointer"}} onClick={()=>props.RemoveQuantityAction(data.productId._id)}/>
                            </span>
                        </div>
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        {
                            data.productId.offerPrice === 0?
                            formatCurrency(data.productId.price*data.quantity):
                            formatCurrency(data.productId.offerPrice*data.quantity)
                        }
                    </Table.Cell>
                    <Table.Cell textAlign='center'>
                        <Icon name='trash alternate' color="violet" size="large" style={{cursor:"pointer"}}  onClick={()=>props.DeleteCartAction(data.productId._id)}/>
                            {/*<Confirm
                                    open={state.open}
                                    header='Remove Product from Cart'
                                    onCancel={handleCancel}
                                    onConfirm={()=>props.DeleteCartAction(data.productId._id)}
                            />*/}
                    </Table.Cell>
                </Table.Row>
                )):null
                }

                <Table.Row>
                    <Table.Cell colSpan="2" rowSpan="5"></Table.Cell>
                    <Table.Cell textAlign='center' style={{fontWeight:"700"}}>SUBTOTAL</Table.Cell>
                    <Table.Cell textAlign='center'>{formatCurrency(props.total)}</Table.Cell>
                    <Table.Cell rowSpan="5"></Table.Cell>
                </Table.Row>
            </Table.Body>

            <Table.Footer fullWidth>
                <Table.Row>
                <Table.HeaderCell />
                <Table.HeaderCell colSpan='4'>
                    <Label as={Link} to="/products" size="large" color="violet" style={{padding:"12px 20px"}}>
                        <Icon name='long arrow alternate left' style={{margin:"0 10px 0 10px"}} size='large'/>
                        CONTINUE SHOPPING
                    </Label>
                    <Label as={Link} to="/checkout" size="large" color="violet" style={{padding:"12px 20px",float:"right"}}>
                        PROCEED TO CHECKOUT   
                        <Icon name='long arrow alternate right' style={{margin: "0 10px 0 10px"}} size='large'/>
                    </Label>
                </Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
        </>
    )
}

const mapStateToProps=(state)=>
{
return{
    total:state.usercart.data.reduce((acc,nextstate)=>
    nextstate.productId.offerPrice === 0 ?
    (acc + nextstate.productId.price * nextstate.quantity):
    (acc + nextstate.productId.offerPrice * nextstate.quantity),0)
};
}

export default connect(mapStateToProps,{AddQuantityAction,RemoveQuantityAction,DeleteCartAction})(Cartp);