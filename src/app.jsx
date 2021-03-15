import React, { Component,Suspense,lazy } from "react";
import {Route,Switch} from "react-router-dom";
import Home from "./components/homecomponent";
//import Products from "./components/productscomponent";
import Signup from "./components/signupcomponent";
import Login from "./components/logincomponent";
import Cart from "./components/cartcomponent";
import Forgotpassword from "./components/forgotpasswordcomponent";
import Resetpassword from "./components/resetpasswordcomponent";
import Dashboard from "./components/dashboardcomponent";
import Editprofile from "./components/editprofilecomponent";
import Updateprofile from "./components/updateprofilecomponent";
import Productde from "./components/productdetailcomponent";
import Checkout from "./components/checkoutcomponent";
import PrivateRoute from "./shared/helper/privateroute";
import Loading from "./components/loader";

class App extends Component
{
    Products = lazy(()=> import("./components/productscomponent"));
    render()
    {
        return(
            <>
            <Suspense fallback={<><Loading style={{ marginRight: "5px" }}/></>}>
                <Route path="/products" exact component={this.Products}/>
            </Suspense>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/home" exact component={Home}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/login" exact component={Login}/>
                <PrivateRoute path="/cart" exact component={Cart}/>
                <Route path="/forgotpassword" exact component={Forgotpassword}/>
                <Route path="/resetpassword/:token" exact component={Resetpassword}/>
                <PrivateRoute path="/dashboard" exact component={Dashboard}/>
                <PrivateRoute path="/profile" exact component={Editprofile}/>
                <PrivateRoute path="/updateprofile/:id" exact component={Updateprofile}/>
                <PrivateRoute path="/productdetails/:id" exact component={Productde}/>
                <PrivateRoute path="/checkout" exact component={Checkout}/>
            </Switch>
           
            </>
        )
    }
}

export default App;