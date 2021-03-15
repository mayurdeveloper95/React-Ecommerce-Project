import axios from "axios";
import {Header} from "../shared/helper/header";

let Alluser_api="http://localhost:4500/api/alluser";
let Signup_api="http://localhost:4500/api/signup";
let Login_api="http://localhost:4500/api/login";
let ForgotPassword_api="http://localhost:4500/api/forgotPassword";
let ResetPassword_api="http://localhost:4500/api/resetPassword";
let DeleteUser_api="http://localhost:4500/api/deleteuser";
let UserData_api="http://localhost:4500/api/getme";
let UpdateUser_api="http://localhost:4500/api/updateuser";

let config={
    headers:
    {
        "Content-type":"application/json"
    }
}

export const allUser=()=>
{
    return axios.get(Alluser_api, config);
}

export const signupUser=(data)=>
{
    return axios.post(Signup_api, JSON.stringify(data), config)
}

export const loginUser=(data)=>
{
    return axios.post(Login_api, JSON.stringify(data), config)
}

export const forgotPasswordUser=(data)=>
{
    return axios.post(ForgotPassword_api, JSON.stringify(data), config)
}

export const resetPasswordUser=(token,data)=>
{
    return axios.post(`${ResetPassword_api}/${token}`, JSON.stringify(data) ,config)
}

export const deleteUser=(id)=>
{
    return axios.delete(`${DeleteUser_api}/${id}`, {headers:Header(),config})
}

export const getUserData=()=>
{
    return axios.get(UserData_api,{headers:Header(),config});
}

export const updateUser=(id,data)=>
{
    return axios.put(`${UpdateUser_api}/${id}`,data,{headers:Header(),config})
}