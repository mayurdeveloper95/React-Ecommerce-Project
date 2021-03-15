import {CART_DATA,ADD_PRODUCT,ERROR, FETCH_ALL_PRODUCT,PAGINATION_PRODUCT,FETCH_ID_PRODUCT,CATEGORY,
        TODAY_OFFER,LATEST_PRODUCT, LOADING, ADD_CART, REMOVE_CART, ADD_QUANTITY, REMOVE_QUANTITY, 
        CHECKOUT_CART,USER_CHECKOUT_CART,ALL_CHECKOUT_CART} from "../actions/producttype";

export const AllProductsReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case FETCH_ALL_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const PaginationProductReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case PAGINATION_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const ProductsByIdReducer=(state={},action)=>
{
    switch(action.type)
    {
        case FETCH_ID_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const TodayOfferReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case TODAY_OFFER:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const LatestProductReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case LATEST_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}


export const AddProductReducer=(state={},action)=>
{
    switch(action.type)
    {
        case ADD_PRODUCT:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const AddCartReducer=(state={},action)=>
{
    switch(action.type)
    {
        case ADD_CART:
            return {cartdata:action.payload,loading:false}
        case ERROR:
            return { error: action.payload, loading: false}
        default:
            return state;
    }
}

export const UserCartReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case CART_DATA:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const AddQuantityReducer=(state={},action)=>
{
    switch(action.type)
    {
        case ADD_QUANTITY:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const CheckoutCartReducer=(state={},action)=>
{
    switch(action.type)
    {
        case CHECKOUT_CART:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};


export const UserCheckoutCartReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case USER_CHECKOUT_CART:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const AllCheckoutCartReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case USER_CHECKOUT_CART:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}