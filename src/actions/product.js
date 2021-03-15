import {allProducts,paginationProduct,productsById,todayOffer,latestProduct,deleteProduct,addProduct,
        addCart,userCart,addQuantity,removeQuantity,deleteCart,checkoutCart,userCheckoutCart,
        allCheckoutCart} from "../api/product";
import {CART_DATA,ADD_PRODUCT,DELETE_PRODUCT,ERROR,FETCH_ALL_PRODUCT,PAGINATION_PRODUCT,FETCH_ID_PRODUCT,
        TODAY_OFFER,LATEST_PRODUCT,SHOW_ERROR, ADD_CART, LOADING, REMOVE_CART, ADD_QUANTITY, 
        REMOVE_QUANTITY,CHECKOUT_CART,USER_CHECKOUT_CART,ALL_CHECKOUT_CART} from "./producttype";

export const AllProductsAction =()=>{
    return async(dispatch)=>
    {
        try{
            let res=await allProducts();
            dispatch({type:FETCH_ALL_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const PaginationProductAction =(page)=>{
    return async(dispatch)=>
    {
        try{
            let res=await paginationProduct(page);
            dispatch({type:PAGINATION_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const ProductsByIdAction=(id)=>{
    return async(dispatch)=>
    {
        try{
            let res=await productsById(id);
            //console.log(res.data);
            dispatch({type:FETCH_ID_PRODUCT,payload:res.data})
        }  
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const TodayOfferAction=()=>{
    return async(dispatch)=>
    {
        try{
            let res=await todayOffer();
            dispatch({type:TODAY_OFFER,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}


export const LatestProductAction=()=>{
    return async(dispatch)=>{
        try{
            let res=await latestProduct();
            dispatch({type:LATEST_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const DeleteProductAction=(id)=>{
    return async(dispatch)=>
    {
            await deleteProduct(id);
            setTimeout(()=>{
            dispatch({type:DELETE_PRODUCT});
            window.location.reload();
            },1000)
            
    }
}

export const AddProductAction=(data)=>
{
    return async(dispatch)=>{
        try{
            let res=await addProduct(data);
            //console.log(res);
            dispatch({type:ADD_PRODUCT,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};

export const AddCartAction=(productId,quantity)=>
{
    return async(dispatch)=>
    {
        try{
            dispatch({type:LOADING});
            let res=await addCart(productId,quantity);
            //console.log(res.data);
            dispatch({type:ADD_CART,payload:res.data});
            dispatch(UserCartAction());
        }
        catch(error)
        {
            dispatch({type:SHOW_ERROR,payload:error.response.data.message});
        }
    }
}

export const UserCartAction=()=>
{
    return async(dispatch)=>{
        try{
            let res=await userCart();
            //console.log(res.data);
            dispatch({type:CART_DATA,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const AddQuantityAction=(id,quantity)=>
{
    return async(dispatch)=>
    {
       let res=await addQuantity(id,quantity);
        setTimeout(()=>{
        dispatch({type:ADD_QUANTITY,payload:res.data});
        //window.location.reload();
        },1500);
        dispatch(UserCartAction());  
    }
}

export const RemoveQuantityAction=(id)=>
{
    return async(dispatch)=>
    {
        await removeQuantity(id);
        setTimeout(()=>{
        dispatch({type:REMOVE_QUANTITY});
        //window.location.reload();
        },1500);
        dispatch(UserCartAction());   
    }
}

export const DeleteCartAction=(id)=>{
    return async(dispatch)=>
    {
            await deleteCart(id);
            setTimeout(()=>{
            dispatch({type:REMOVE_CART});
            alert("Product Remove From Cart");
            },500);      
            dispatch(UserCartAction());   
    }
}


export const CheckoutCartAction=(data)=>
{
    return async(dispatch)=>{
        try{
            let res=await checkoutCart(data);
            //console.log(res);
            dispatch({type:CHECKOUT_CART,payload:res.data});
            setTimeout(()=>{
                dispatch(UserCartAction());
                dispatch(UserCheckoutCartAction());
                },500);
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};


export const UserCheckoutCartAction=()=>
{
    return async(dispatch)=>{
        try{
            let res=await userCheckoutCart();
            //console.log(res.data);
            dispatch({type:USER_CHECKOUT_CART,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const AllCheckoutCartAction=()=>
{
    return async(dispatch)=>{
        try{
            let res=await allCheckoutCart();
            dispatch({type:USER_CHECKOUT_CART,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}