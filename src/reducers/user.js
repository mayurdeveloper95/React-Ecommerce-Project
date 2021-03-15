import { ALL_USER, USER_SIGNUP, USER_LOGIN, RESET_PASSWORD,
    UPDATE_USER, ERROR, USER_DATA, FORGOT_PASSWORD} from "../actions/usertype";

export const AllUserReducer=(state=[],action)=>
{
    switch(action.type)
    {
        case ALL_USER:
            return action.payload
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}

export const SignupReducer=(state={},action)=>
{
    switch(action.type)
    {
        case USER_SIGNUP:
            return action.payload;
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const LoginReducer=(state={},action)=>
{
    switch(action.type)
    {
        case USER_LOGIN:
            return {login:action.payload};
        case USER_DATA:
            return {currentuser:action.payload};
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};


export const ForgotPasswordReducer=(state={},action)=>
{
    switch(action.type)
    {
        case FORGOT_PASSWORD:
            return {forgot:action.payload};
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const ResetPasswordReducer=(state={},action)=>
{
    switch(action.type)
    {
        case RESET_PASSWORD:
            return {reset:action.payload};
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
};

export const UpdateUserReducer=(state={},action)=>
{
    switch(action.type)
    {
        case UPDATE_USER:
            return {updateuser:action.payload};
        case ERROR:
            return {error:action.payload};
        default:
            return state;
    }
}
