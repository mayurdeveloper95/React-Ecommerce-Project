import axios from "axios";
import {Header} from "../shared/helper/header";

let Allproducts_api="http://localhost:4500/api/allproducts";
let Productpagi_api="http://localhost:4500/api/product";
let Productbyid_api="http://localhost:4500/api/findprodbyid";
let Todayproduct_api="http://localhost:4500/api/todayoffer";
let Latestproduct_api="http://localhost:4500/api/latestproduct";
let Deleteproduct_api="http://localhost:4500/api/deleteprod";
let Addproduct_api="http://localhost:4500/api/addproduct";
let Addcart_api="http://localhost:4500/api/addtocart";
let Deletecart_api="http://localhost:4500/api/deletecart";
let Usercart_api="http://localhost:4500/api/usercart";
let Addquantity_api="http://localhost:4500/api/addquantity";
let Removequantity_api="http://localhost:4500/api/removequantity";
let Checkoutcart_api="http://localhost:4500/api/checkoutcart";
let UserCheckoutcart_api="http://localhost:4500/api/getusercart";
let AllCheckoutcart_api="http://localhost:4500/api/getallcart";

let config={
    headers:
    {
        "Content-type":"application/json"
    }
}

export const allProducts=()=>
{
    return axios.get(Allproducts_api,config);
}

export const paginationProduct=(page)=>
{
    return axios.post(`${Productpagi_api}/${page}`,config);
}

export const productsById=(id)=>
{
    return axios.get(`${Productbyid_api}/${id}`, config);
}

export const todayOffer=()=>
{
    return axios.get(Todayproduct_api,config);
}

export const latestProduct=()=>{
    return axios.get(Latestproduct_api,config);
}

export const deleteProduct=(id)=>
{
    return axios.delete(`${Deleteproduct_api}/${id}`, {headers:Header(),config})
}

export const addProduct=(data)=>
{
    return axios.post(Addproduct_api, data, config)
}

export const addCart=(productId,quantity)=>{
    return axios.post(`${Addcart_api}/${productId}`, { quantity }, {headers:Header(),config});
}

export const userCart=()=>{
    return axios.get(Usercart_api,{headers:Header(),config});
}

export const addQuantity=(id,quantity)=>
{
    return axios.put(`${Addquantity_api}/${id}`,{ quantity }, {headers:Header(),config})
}

export const removeQuantity=(id)=>
{
    return axios.delete(`${Removequantity_api}/${id}`, {headers:Header(),config})
}

export const deleteCart=(id)=>{
    return axios.delete(`${Deletecart_api}/${id}`, {headers:Header(),config});
}

export const checkoutCart=(data)=>
{
    return axios.post(Checkoutcart_api, data, {headers:Header(),config});
}

export const userCheckoutCart=()=>
{
    return axios.get(UserCheckoutcart_api, {headers:Header(),config});
}

export const allCheckoutCart=()=>
{
    return axios.get(AllCheckoutcart_api, {headers:Header(),config});
}