import { createContext } from "react";

export const LoginInitState = {
    isLogin: false,
    username: 'admin',
}

export const LoginReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLogin: true,
            };
        case 'LOGOUT':
            return {
                ...state,
                isLogin: false,
            };
        default:
            return state;
    }
}

const LoginContext = createContext();

export default LoginContext;