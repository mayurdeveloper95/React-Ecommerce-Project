import {combineReducers} from "redux";
import {AllUserReducer, SignupReducer, LoginReducer, ResetPasswordReducer, UpdateUserReducer,
ForgotPasswordReducer} from "../reducers/user";
import storage from 'redux-persist/lib/storage';
import {AllProductsReducer,PaginationProductReducer,ProductsByIdReducer,
TodayOfferReducer,LatestProductReducer,AddProductReducer,AddCartReducer,UserCartReducer, AddQuantityReducer
,CheckoutCartReducer,UserCheckoutCartReducer,AllCheckoutCartReducer} from "../reducers/product";

const reducers=combineReducers({
    alluser:AllUserReducer,signup:SignupReducer,login:LoginReducer,
    reset:ResetPasswordReducer,updateuser:UpdateUserReducer,forgot:ForgotPasswordReducer,
    allproduct:AllProductsReducer,productpagination:PaginationProductReducer,productbyid:ProductsByIdReducer,
    todayoffer:TodayOfferReducer,latest:LatestProductReducer,addproduct:AddProductReducer,
    addcart:AddCartReducer,usercart:UserCartReducer,addquantity:AddQuantityReducer,
    checkoutcart:CheckoutCartReducer,usercheckout:UserCheckoutCartReducer,allcheckout:AllCheckoutCartReducer});

export const persistConfig = {
        key: 'root',
        storage,
        whitelist:['addcart','usercart']
      }

export default reducers;