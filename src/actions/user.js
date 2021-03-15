import { ALL_USER, USER_SIGNUP, USER_LOGIN, FORGOT_PASSWORD, RESET_PASSWORD, DELETE_USER,
USER_DATA, UPDATE_USER, ERROR, USER_LOGOUT } from "./usertype";
import { allUser, signupUser, loginUser, forgotPasswordUser, resetPasswordUser, deleteUser, getUserData, updateUser} from "../api/user";
import {history} from "../shared/helper/history";
import {UserCartAction} from "../actions/product";

export const AllUserAction=()=>
{
    return async (dispatch)=>
    {
        try{
            let res=await allUser();
            dispatch({type:ALL_USER,payload:res.data});
        }
        catch(error)
        {
            //console.log(error.response.data.message);
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};

export const SignupAction=(data)=>
{
    return async(dispatch)=>{
        try{
            let res=await signupUser(data);
            dispatch({type:USER_SIGNUP,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};

export const LoginAction=(data)=>
{
    return async(dispatch)=>{
        try{
            let res=await loginUser(data);
            //console.log(res.data);
            localStorage.setItem('currentuser',JSON.stringify(res.data.t));
            dispatch({type:USER_LOGIN,payload:res.data});
            history.push("/products");
            window.location.reload();
            dispatch(UserCartAction()); 
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
};

export const LogoutAction=()=>
{
    return async (dispatch)=>
    {
        localStorage.removeItem('currentuser');
        localStorage.removeItem('total');
        dispatch({type:USER_LOGOUT});
        history.push("/home");
        window.location.reload();
    }
}

export const ForgotPasswordAction=(data)=>
{
    return async (dispatch)=>
    {
        try{
            let res=await forgotPasswordUser(data);
            dispatch({type:FORGOT_PASSWORD,payload:res.data});
            setTimeout(() => {
                history.push("/login");
                window.location.reload();
              }, 2500);
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const ResetPasswordAction=(token,data)=>
{
    return async (dispatch)=>
    {
        try{
            let res=await resetPasswordUser(token,data);
            dispatch({type:RESET_PASSWORD,payload:res.data});
            setTimeout(() => {
                history.push("/login");
                window.location.reload();
              }, 2500);
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}

export const DeleteUserAction=(id)=>{
    return async(dispatch)=>
    {
            await deleteUser(id);
            setTimeout(()=>{
            dispatch({type:DELETE_USER});
            window.location.reload();
            },1000)
            
    }
}

export const UserDataAction=()=>
{
    return async (dispatch)=>
    {
        try{
            let res=await getUserData();
            dispatch({type:USER_DATA,payload:res.data.userdata});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response});
        }
    }
}

export const UpdateUserAction=(id,data)=>
{
    return async (dispatch)=>
    {
        try{
            let res=await updateUser(id,data);
            //console.log({data:res});
            dispatch({type:UPDATE_USER,payload:res.data});
        }
        catch(error)
        {
            dispatch({type:ERROR,payload:error.response.data.message});
        }
    }
}