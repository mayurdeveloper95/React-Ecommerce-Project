import React from "react";
import { Card, Image, Label} from 'semantic-ui-react';
import "./css/productcard.css";

const Productp=(props)=>
{
    const formatCurrency=(value)=>{
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR', currencyDisplay: 'narrowSymbol' }).format(value).replace(/^(\D+)/, '$1 ');
    }
    const formatDescription=(value)=>{
        if(!value){return null;}
        return value.substring(0,60)+"...";
    }
    let {pdata}=props;
    return(
        <>
            <Card onClick={()=>props.history.push(`/productdetails/${pdata._id}`)} key={pdata._id}>
                {
                    pdata.offerPrice > 0 ? <Label color='violet' ribbon='right'>{formatCurrency(pdata.offerPrice)}</Label> :null
                }
                <Image className="product image" src={pdata.imagepic} alt={pdata.pname}/>
                <Card.Content>
                    <Card.Header>{pdata.pname}</Card.Header>
                    <Card.Description>
                    {formatDescription(pdata.description)}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Card.Meta>
                        <span className='date left floated' style={{marginLeft:"auto"}}> 
                            <Label color='blue' tag>{formatCurrency(pdata.price)}</Label>
                        </span>
                    </Card.Meta>
                    <Card.Meta>
                        <span className='date right floated'>
                            <p style={{fontWeight:"bold",color:"black"}}>{pdata.category.catname.charAt(0).toUpperCase() + pdata.category.catname.slice(1)}</p>
                        </span>
                    </Card.Meta>
                </Card.Content>
            </Card>
        </>
    )
}

export default Productp;